import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getAdminSession } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { table, id, status } = await req.json();

  if (!["contact_submissions", "intake_submissions"].includes(table)) {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 });
  }

  if (!["New", "Contacted", "Closed"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  await supabaseAdmin
    .from(table)
    .update({ status })
    .eq("id", id);

  return NextResponse.json({ success: true });
}
