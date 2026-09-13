// @ts-nocheck
import { createServerSupabaseClient } from "@/lib/db/supabase-server";
import { notFound } from "next/navigation";
import { DatasetDetailClient } from "./client";

export default async function DatasetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createServerSupabaseClient();

  const { data: dataset, error } = await supabase
    .from("datasets")
    .select("*, profiles!datasets_uploaded_by_fkey(id, full_name, email), experiments(id, experiment_code, title)")
    .eq("id", (await params).id)
    .single();

  if (error || !dataset) {
    notFound();
  }

  return <DatasetDetailClient dataset={dataset} />;
}
