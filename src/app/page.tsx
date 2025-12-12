"use client";
  
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Globe, Linkedin, Mail } from "lucide-react";
import Image from "next/image"; // ✅ at the top

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
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-6 max-w-6xl mx-auto" id="about">
        <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
        <p className="text-lg leading-relaxed text-gray-700">
Nharuvi Global Private Limited is a forward-thinking accounting and consulting firm committed to delivering Big Four-quality services with the agility, affordability, and innovation of a modern tech-driven practice. We specialize in providing end-to-end financial, tax, and compliance solutions to businesses of all sizes—ranging from startups and SMEs to global enterprises. Our mission is to go beyond accounting by becoming a strategic partner in your growth journey. We combine global best practices, intelligent automation, and personalized insights to help our clients navigate the complexities of local and international regulations with clarity and confidence. </p>
      </section>

      {/* Services */}
      <section className="bg-white py-20 px-6" id="services">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4 text-center">Our Services</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
            From core compliance to strategic advisory — we simplify finance so you can focus on scaling.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                slug: "accounting",
                bgText: "ACC",
                title: "Accounting & Bookkeeping",
                desc: "Cloud-based bookkeeping, MIS reports, ledgers, and inventory management.",
              },
              {
                slug: "audit",
                bgText: "AUD",
                title: "Audit & Assurance",
                desc: "Statutory, internal, and forensic audits with actionable financial insights.",
              },
              {
                slug: "taxation",
                bgText: "TAX",
                title: "Tax & Compliance",
                desc: "Corporate, international & indirect tax filings, representation, and planning.",
              },
              {
                slug: "roc-compliance",
                bgText: "LAW",
                title: "Legal & Regulatory",
                desc: "Entity law, contracts, litigation support, and government registrations.",
              },
              {
                slug: "virtual-cfo",
                bgText: "CFO",
                title: "Virtual CFO & Advisory",
                desc: "Performance monitoring, MIS, budgeting, fundraising & founder strategy.",
              },
              {
                slug: "registration",
                bgText: "SET",
                title: "Business Setup & Corporate",
                desc: "Company formation, ROC filings, and cross-border expansion assistance.",
              },
            ].map(({ slug, bgText, title, desc }) => (
              <Link
                key={slug}
                href={`/services/${slug}`}
                className="group block border rounded-xl overflow-hidden hover:shadow-md transition"
              >
                <div className="relative h-28 bg-lime-100 flex items-center justify-center">
                  <h1 className="text-[72px] font-bold text-lime-700 opacity-20">{bgText}</h1>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-lime-700">{title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{desc}</p>
                  <span className="inline-block mt-4 text-lime-700 font-medium group-hover:underline">Read more</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="bg-white py-20 px-6" id="insights">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-center">Insights & Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                <Image
  src={`/insights/thumb-${i + 1}.jpg`}
  alt={`Insight ${i + 1}`}
  width={500}
  height={250}
  className="w-full h-44 object-cover"
/>
                <div className="p-5">
                  <span className="text-xs uppercase text-green-600 font-semibold">Advisory</span>
                  <p className="text-sm text-gray-500 mt-1">July {10 + i}, 2025</p>
                  <h3 className="mt-2 font-medium text-lg text-gray-900">
                    How to scale global operations with remote finance teams
                  </h3>
                  <a href="#" className="mt-3 inline-block text-sm text-green-700 hover:underline">Read more →</a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="#" className="text-green-700 text-sm hover:underline">View all insights</a>
          </div>
        </div>
      </section>

{/* Contact CTA */}
<section className="py-20 px-6 max-w-4xl mx-auto text-center" id="contact">
  <h2 className="text-3xl font-semibold mb-4">
    Ready to talk or work with us?
  </h2>
  <p className="text-gray-600 mb-8">
    Whether you have a quick question or are ready to onboard, choose how you'd like to proceed.
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


      {/* Footer */}
      <footer className="bg-gray-100 py-10 px-6 text-sm text-gray-600">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
          <div>
            <h4 className="text-base font-semibold text-gray-800 mb-3">Nharuvi Global</h4>
            <p>Bengaluru, KA, India</p>
            <p>nharuviglobal@gmail.com</p>
          </div>
          <div>
            <h4 className="text-base font-semibold text-gray-800 mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/">Home</Link></li>
              <li><Link href="#about">About</Link></li>
              <li><Link href="#services">Services</Link></li>
              <li><Link href="#contact">Contact</Link></li>
              <li><Link href="/intake">Intake Form</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold text-gray-800 mb-3">Core Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services/accounting">Accounting</Link></li>
              <li><Link href="/services/audit">Audit & Assurance</Link></li>
              <li><Link href="/services/taxation">Taxation</Link></li>
              <li><Link href="/services/roc-compliance">Legal</Link></li>
              <li><Link href="/services/virtual-cfo">Virtual CFO</Link></li>
              <li><Link href="/services/registration">Business Setup</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold text-gray-800 mb-3">Connect</h4>
            <div className="flex space-x-4 mb-3">
              <a href="#" aria-label="Website"><Globe className="w-5 h-5" /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
              <a href="mailto:nharuviglobal@gmail.com" aria-label="Email"><Mail className="w-5 h-5" /></a>
            </div>
            <p className="text-xs text-gray-500 mt-2">&copy; {new Date().getFullYear()} Nharuvi Global. All rights reserved.</p>
            <p className="text-xs text-gray-500">Privacy Policy · Terms</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
