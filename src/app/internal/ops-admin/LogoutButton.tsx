"use client";

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/internal/ops-admin/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
    >
      Logout
    </button>
  );
}
