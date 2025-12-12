"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      setError("Invalid username or password");
    } else {
      window.location.href = "/internal/ops-admin";
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full space-y-4"
      >
        <h1 className="text-xl font-bold text-center">
          Admin Login
        </h1>

        <input
          className="w-full border p-2 rounded"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <button
          className="w-full bg-black text-white py-2 rounded"
        >
          Sign In
        </button>
      </form>
    </main>
  );
}
