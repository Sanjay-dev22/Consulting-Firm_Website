"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Globe, Linkedin, Mail, MapPin } from "lucide-react";
import Image from "next/image";

const MAPS_URL = "https://maps.app.goo.gl/rKV9oXWU2cB2m1Yv8";

export default function LandingPage() {
  return (
    <main className="font-sans bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl font-bold text-white">Now, for tomorrow</h1>
          <p className="text-xl mt-4 text-white max-w-xl">
            Redefining compliance, finance, and growth — the smart way.
          </p>

          <Link href="/intake">
            <Button className="mt-6 px-6 py-3 text-lg">Get Started</Button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-10 text-center">
          {[
            { label: "Global Reach", value: "60+ Regions" },
            { label: "Expert Team", value: "200+ Professionals" },
            { label: "Client Success", value: "2,000+ Businesses" },
            { label: "Experience", value: "15+ Years" },
            { label: "Annual Filings", value: "10,000+" },
            { label: "Remote Operations", value: "100% Cloud-Enabled" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-6 max-w-6xl mx-auto" id="about">
        <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          Nharuvi Global Private Limited is a forward-thinking accounting and
          consulting firm committed to delivering Big Four–quality services with
          the agility, affordability, and innovation of a modern tech-driven
          practice.
        </p>
      </section>

      {/* Insights */}
      <section className="bg-white py-20 px-6" id="insights">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            Insights & Resources
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
              >
                <Image
                  src={`/insights/thumb-${i}.jpg`}
                  alt={`Insight ${i}`}
                  width={500}
                  height={250}
                  className="w-full h-44 object-cover"
                />
                <div className="p-5">
                  <span className="text-xs uppercase text-green-600 font-semibold">
                    Advisory
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    July {10 + i}, 2025
                  </p>
                  <h3 className="mt-2 font-medium text-lg">
                    How to scale global operations with remote finance teams
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section
        className="py-20 px-6 max-w-4xl mx-auto text-center"
        id="contact"
      >
        <h2 className="text-3xl font-semibold mb-4">
          Ready to talk or work with us?
        </h2>
        <p className="text-gray-600 mb-8">
          Whether you have a quick question or are ready to onboard, choose how
          you’d like to proceed.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/contact">
            <Button variant="outline" className="px-8 py-3 text-lg">
              Contact Us
            </Button>
          </Link>

          <Link href="/intake">
            <Button className="px-8 py-3 text-lg">Client Intake</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-10 px-6 text-sm text-gray-600">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
          <div>
            <h4 className="font-semibold mb-2">Nharuvi Global</h4>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline"
            >
              <MapPin className="w-4 h-4" />
              Bengaluru, Karnataka, India
            </a>

            <p className="mt-2">nharuviglobal@gmail.com</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/intake">Client Intake</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Connect</h4>
            <div className="flex gap-3">
              <Globe className="w-5 h-5" />
              <Linkedin className="w-5 h-5" />
              <Mail className="w-5 h-5" />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
