import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      full_name,
      email,
      phone,
      business_name,
      service_interest,
      annual_revenue,
      location,
      comments,
      consent,
    } = body;

    if (!full_name || !email || !phone || !consent) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("intake_submissions").insert([
      {
        full_name,
        email,
        phone,
        business_name,
        service_interest,
        annual_revenue,
        location,
        comments,
        consent,
      },
    ]);

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
