"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Globe,
  Linkedin,
  Mail,
  MapPin,
  ShieldCheck,
  Clock,
  Users,
  CheckCircle,
  Lock,
  Target,
} from "lucide-react";
import Image from "next/image";

const MAPS_URL = "https://maps.app.goo.gl/rKV9oXWU2cB2m1Yv8";

export default function LandingPage() {
  return (
    <main className="font-sans bg-white text-gray-900">

      {/* HERO — Architectural Visual */}
<section className="relative h-[85vh] w-full overflow-hidden">
  <Image
    src="/hero-architecture.jpg"
    alt="Global professional services"
    fill
    priority
    className="object-cover"
  />
  <div className="absolute inset-0 bg-black/55" />

  <div className="relative z-10 h-full flex items-center">
    <div className="max-w-6xl mx-auto px-6">
      <div className="max-w-3xl text-white">
        <h1 className="text-5xl md:text-6xl font-semibold leading-tight">
          Beyond accounting,<br />
          Behind every business
        </h1>

        <p className="mt-6 text-xl text-gray-200">
          Powered by precision, integrity, and global expertise
        </p>

        <p className="mt-6 text-base text-gray-300 max-w-2xl">
          Trusted accounting, compliance, and advisory services for businesses
          operating in a complex, global environment.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/intake">
            <Button className="px-8 py-3 text-lg">
              Get Started
            </Button>
          </Link>

          <Link href="/contact">
            <Button
              variant="outline"
              className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-black"
            >
              Speak to an Expert
            </Button>
          </Link>
        </div>

        <div className="mt-14 border-t border-white/30 pt-6 text-sm text-gray-200">
          <strong>AI-powered finance solutions</strong> for clients worldwide
        </div>
      </div>
    </div>
  </div>
</section>


      {/* ABOUT */}
      <section className="py-24 px-6 max-w-6xl mx-auto" id="about">
        <h2 className="text-3xl font-semibold mb-6">Who We Are</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          Nharuvi Global Private Limited is a forward-thinking accounting and
          consulting firm committed to delivering high-precision financial,
          tax, and compliance solutions. We operate at the intersection of
          professional excellence, intelligent automation, and ethical
          responsibility—supporting businesses with clarity, confidence, and
          long-term value.
        </p>
      </section>

      {/* PRINCIPLES — WORD-FOR-WORD */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-14 text-center">
            Our Commitment to Every Client
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Transparency in Every Engagement",
                desc:
                  "We believe our clients deserve absolute clarity. From detailed work processes to transparent pricing, we ensure that every task, every charge, and every outcome is communicated with complete honesty and precision.",
              },
              {
                icon: CheckCircle,
                title: "Accuracy, Clarity & Professional Excellence",
                desc:
                  "Quality is non-negotiable. Every deliverable we produce undergoes meticulous checks to ensure accuracy, clarity, and compliance—empowering clients to make informed decisions with confidence.",
              },
              {
                icon: Lock,
                title: "Confidentiality & Data Protection",
                desc:
                  "Client information is sacred. We follow strict security standards and ethical practices to safeguard all data, ensuring complete privacy and protection at every stage of the engagement.",
              },
              {
                icon: Target,
                title: "Value-Driven Service Delivery",
                desc:
                  "We are committed to providing tangible value in everything we do. Our clients receive premium-quality work, strategic insights, and outcomes that justify every rupee—and every minute—invested in us.",
              },
              {
                icon: Clock,
                title: "Timeliness & Seamless Communication",
                desc:
                  "Deadlines matter. We ensure punctual delivery supported by uninterrupted, proactive, and professional communication, keeping clients informed at every step without follow-ups or delays.",
              },
              {
                icon: Users,
                title: "Client-Centric Commitment",
                desc:
                  "Every client is a priority. Our approach focuses on understanding unique needs, offering personalised solutions, and building long-term relationships rooted in mutual trust, consistency, and reliability.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white p-7 rounded-xl border">
                <Icon className="w-6 h-6 text-green-600 mb-4" />
                <h3 className="font-semibold text-lg mb-3">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="bg-white py-24 px-6" id="insights">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12 text-center">
            Insights & Resources
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl overflow-hidden border hover:shadow-md transition"
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
                  <h3 className="mt-3 font-medium text-lg">
                    How to scale global operations with remote finance teams
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center" id="contact">
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
            <Button className="px-8 py-3 text-lg">
              Client Intake
            </Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
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
