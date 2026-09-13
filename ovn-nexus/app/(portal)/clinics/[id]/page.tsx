// @ts-nocheck
import { createServerSupabaseClient } from "@/lib/db/supabase-server";
import { notFound } from "next/navigation";
import { ClinicDetailClient } from "./client";

export default async function ClinicDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createServerSupabaseClient();

  const { data: clinic, error } = await supabase
    .from("clinics")
    .select("*, institutions(id, name, country)")
    .eq("id", (await params).id)
    .single();

  if (error || !clinic) notFound();

  const { data: patients } = await supabase
    .from("patients")
    .select("*")
    .eq("clinic_id", (await params).id)
    .order("enrollment_date", { ascending: false });

  const { count: sampleCount } = await supabase
    .from("biomarkers")
    .select("id", { count: "exact", head: true })
    .in(
      "patient_id",
      (patients || []).map((p) => p.id)
    );

  return (
    <ClinicDetailClient
      clinic={clinic}
      patients={patients || []}
      sampleCount={sampleCount ?? clinic.total_samples}
    />
  );
}
