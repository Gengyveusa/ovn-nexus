// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/db/supabase-server";

// GET /api/music/[id] — get a single music request with its versions

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createServerSupabaseClient();

  const { data: request, error } = await supabase
    .from("music_requests")
    .select("*")
    .eq("id", (await params).id)
    .single();

  if (error) return NextResponse.json({ error: "Music request not found" }, { status: 404 });

  // Also fetch versions
  const { data: versions } = await supabase
    .from("music_versions")
    .select("*")
    .eq("request_id", (await params).id)
    .order("version_number", { ascending: true });

  return NextResponse.json({ data: { ...request, versions: versions || [] } });
}
