import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

/* 🔴 IMPORTANT: Disable caching in production */
export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nharuvi Global",
  description:
    "Smart, reliable, and tech-driven accounting & compliance solutions.",
};

/* -------- Fetch navbar logo (server-side) -------- */
async function getNavbarLogo() {
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "navbar_logo_url")
    .single();

  if (error) return "";
  return data?.value || "";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navbarLogoUrl = await getNavbarLogo();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar logoUrl={navbarLogoUrl} />
        {children}
      </body>
    </html>
  );
}
