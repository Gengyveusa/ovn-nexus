// @ts-nocheck
import { createServerSupabaseClient } from "@/lib/db/supabase-server";
import { notFound } from "next/navigation";
import { PatientDetailClient } from "./client";

export default async function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createServerSupabaseClient();

  const { data: patient, error } = await supabase
    .from("patients")
    .select("*, clinics(name, clinic_code)")
    .eq("id", (await params).id)
    .single();

  if (error || !patient) notFound();

  const [visits, biomarkers, clinics] = await Promise.all([
    supabase.from("visits").select("*").eq("patient_id", (await params).id).order("visit_date", { ascending: false }),
    supabase.from("biomarkers").select("*").eq("patient_id", (await params).id).order("sample_date", { ascending: false }),
    supabase.from("clinics").select("id, name, clinic_code").eq("is_active", true),
  ]);

  return (
    <PatientDetailClient
      patient={patient}
      visits={visits.data || []}
      biomarkers={biomarkers.data || []}
      clinics={clinics.data || []}
    />
  );
}
