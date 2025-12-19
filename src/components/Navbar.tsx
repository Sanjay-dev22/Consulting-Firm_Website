"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

const navItems = [
  { name: "About Us", href: "/about" },
  { name: "Industries", href: "/industries" },
  { name: "Insights", href: "/insights" },
  { name: "Regions", href: "/regions" },
];

type NavbarProps = {
  logoUrl: string;
};

export default function Navbar({ logoUrl }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="bg-[#121926] text-white sticky top-0 z-50 shadow">
      {/* Full-width navbar for outward spread */}
      <div className="w-full px-10 lg:px-16 h-16 flex items-center justify-between">

        {/* LOGO (dynamic) */}
        <Link href="/" className="flex items-center">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt="Nharuvi Global"
              width={260}
              height={44}
              priority
              className="object-contain translate-y-[1px]"
            />
          ) : (
            // Fallback (never breaks UI)
            <span className="text-xl font-bold tracking-wide">
              Nharuvi Global
            </span>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className={`hover:text-green-400 transition ${
                pathname.startsWith(href)
                  ? "text-green-400 font-semibold"
                  : ""
              }`}
            >
              {name}
            </Link>
          ))}

          <Link
            href="/services"
            className={`hover:text-green-400 transition ${
              pathname.startsWith("/services")
                ? "text-green-400 font-semibold"
                : ""
            }`}
          >
            Services
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/contact"
            className={`ml-4 px-4 py-2 rounded-full border border-green-400 text-green-400 hover:bg-green-400 hover:text-black font-semibold transition ${
              pathname === "/contact"
                ? "bg-green-400 text-black"
                : ""
            }`}
          >
            Contact
          </Link>

          {/* Primary CTA */}
          <Link
            href="/intake"
            className="px-4 py-2 rounded-full bg-green-400 hover:bg-green-500 text-black font-semibold transition"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile Menu Icon */}
        <button className="md:hidden" aria-label="Open menu">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}
