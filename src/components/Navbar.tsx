'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

const navItems = [
  { name: 'About Us', href: '/about' },
  { name: 'Industries', href: '/industries' },
  { name: 'Insights', href: '/insights' },
  { name: 'Regions', href: '/regions' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-[#121926] text-white sticky top-0 z-50 shadow">
      {/* 
        Use fixed height instead of py-* 
        This prevents the “bloated navbar” issue permanently
      */}
      <div className="max-w-8xl mx-auto px-6 h-17 flex items-center justify-between">

        {/* LOGO — top-left, anchored, professional */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-navbar.png"
            alt="Nharuvi Global"
            width={290}
            height={44}
            priority
            className="object-contain translate-y-[1px]"
          />
          {/* Accessibility + SEO fallback */}
          <span className="sr-only">Nharuvi Global</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              className={`hover:text-green-400 transition ${
                pathname.startsWith(href)
                  ? 'text-green-400 font-semibold'
                  : ''
              }`}
            >
              {name}
            </Link>
          ))}

          <Link
            href="/services"
            className={`hover:text-green-400 transition ${
              pathname.startsWith('/services')
                ? 'text-green-400 font-semibold'
                : ''
            }`}
          >
            Services
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/contact"
            className={`ml-4 px-4 py-2 rounded-full border border-green-400 text-green-400 hover:bg-green-400 hover:text-black font-semibold transition ${
              pathname === '/contact'
                ? 'bg-green-400 text-black'
                : ''
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

        {/* Mobile Menu Icon (future enhancement) */}
        <button className="md:hidden" aria-label="Open menu">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}
