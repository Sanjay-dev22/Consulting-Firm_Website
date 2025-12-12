import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase-admin";

const SESSION_COOKIE = "nharuvi_admin_session";

/**
 * Login admin and set secure session cookie
 */
export async function loginAdmin(username: string, password: string) {
  const { data: admin } = await supabaseAdmin
    .from("admin_users")
    .select("*")
    .eq("username", username)
    .eq("is_active", true)
    .single();

  if (!admin) return false;

  const isValid = await bcrypt.compare(password, admin.password_hash);
  if (!isValid) return false;

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, admin.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return true;
}

/**
 * Logout admin by clearing session cookie
 */
export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/**
 * Get current admin session (admin ID or undefined)
 */
export async function getAdminSession() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}
