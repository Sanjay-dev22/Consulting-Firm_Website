import { NextResponse } from "next/server";
import { loginAdmin } from "@/lib/admin-auth";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const success = await loginAdmin(username, password);

    if (!success) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
