import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message?: string;
  consent: boolean;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;
    const { name, email, phone, message, consent } = body;

    if (!name || !email || !phone || !consent) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("contact_submissions")
      .insert([{ name, email, phone, message, consent }]);

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Database insert failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 500 }
    );
  }
}
