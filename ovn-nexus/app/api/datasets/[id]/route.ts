// @ts-nocheck
import { createServerSupabaseClient } from "@/lib/db/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("datasets")
    .select("*, profiles!datasets_uploaded_by_fkey(full_name), experiments(experiment_code)")
    .eq("id", (await params).id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: error.code === "PGRST116" ? 404 : 500 });
  return NextResponse.json({ data });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createServerSupabaseClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from("datasets")
    .update(body)
    .eq("id", (await params).id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("datasets")
    .delete()
    .eq("id", (await params).id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
