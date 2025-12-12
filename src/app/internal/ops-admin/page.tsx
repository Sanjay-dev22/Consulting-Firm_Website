import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import LogoutButton from "./LogoutButton";
import AdminClient from "./AdminClient";

export default async function AdminDashboard() {
  const session = await getAdminSession();
  if (!session) redirect("/internal/ops-admin/login");

  const { data: contacts } = await supabaseAdmin
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: intakes } = await supabaseAdmin
    .from("intake_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="max-w-7xl mx-auto py-12 px-6">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <LogoutButton />
      </div>

      <AdminClient
        contacts={contacts || []}
        intakes={intakes || []}
      />
    </main>
  );
}
