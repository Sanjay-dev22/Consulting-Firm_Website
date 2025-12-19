import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  // 1️⃣ Admin authentication
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2️⃣ Parse multipart form data
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const key = formData.get("key") as string | null;

  if (!file || !key) {
    return NextResponse.json(
      { error: "Missing file or key" },
      { status: 400 }
    );
  }

  if (key !== "navbar_logo_url") {
    return NextResponse.json(
      { error: "Invalid site setting key" },
      { status: 400 }
    );
  }

  // 3️⃣ Generate a safe, unique file name
  const ext = file.name.split(".").pop();
  const fileName = `navbar-logo-${Date.now()}.${ext}`;

  // 4️⃣ Upload to Supabase Storage
  const { error: uploadError } = await supabaseAdmin.storage
    .from("branding")
    .upload(fileName, file, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) {
    return NextResponse.json(
      { error: uploadError.message },
      { status: 500 }
    );
  }

  // 5️⃣ Get public URL
  const { data: publicData } = supabaseAdmin.storage
    .from("branding")
    .getPublicUrl(fileName);

  const publicUrl = publicData.publicUrl;

  // 6️⃣ Save URL in site_settings
  const { error: dbError } = await supabaseAdmin
    .from("site_settings")
    .update({
      value: publicUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("key", key);

  if (dbError) {
    return NextResponse.json(
      { error: dbError.message },
      { status: 500 }
    );
  }

  // 7️⃣ Done
  return NextResponse.json({
    success: true,
    url: publicUrl,
  });
}
