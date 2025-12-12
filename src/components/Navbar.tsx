'use client';

import Link from 'next/link';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-wide">
          Nharuvi Global
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
              pathname === '/contact' ? 'bg-green-400 text-black' : ''
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
        <button className="md:hidden">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}
