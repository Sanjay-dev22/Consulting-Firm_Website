"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

const MAPS_URL = "https://maps.app.goo.gl/rKV9oXWU2cB2m1Yv8";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data: { error?: string } = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");

      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex gap-4">
            <Mail className="w-6 h-6 text-green-600" />
            <a href="mailto:nharuviglobal@gmail.com" className="hover:underline">
              nharuviglobal@gmail.com
            </a>
          </div>

          <div className="flex gap-4">
            <Phone className="w-6 h-6 text-green-600" />
            <p>+91 80569 95508</p>
          </div>

          <div className="flex gap-4">
            <MapPin className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-semibold mb-1">Office Location</p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Door No. 9, 2nd Floor,<br />
                Hi Tech Building, No. 624 & 624/2,<br />
                B Channasandra, OMBR Layout,<br />
                Kasturi Nagar, Bengaluru,<br />
                Karnataka – 560033, India
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" placeholder="Your Name" required onChange={handleChange} />
            <Input name="email" type="email" placeholder="Email Address" required onChange={handleChange} />
            <Input name="phone" placeholder="Phone Number" required onChange={handleChange} />

            <textarea
              name="message"
              rows={4}
              className="w-full p-3 border rounded-md"
              placeholder="Your Message"
              onChange={handleChange}
            />

            <label className="flex gap-2 text-sm">
              <input type="checkbox" name="consent" required onChange={handleChange} />
              I allow this website to store my submission.
            </label>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <Button disabled={loading} className="w-full text-lg">
              {loading ? "Submitting…" : "Send Message"}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              We typically respond within 1 business day.
            </p>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-4"
          >
            <p className="text-green-700 font-semibold">
              ✅ Thank you! Your message has been sent successfully.
            </p>

            <p className="text-sm text-gray-600">
              If you’re ready to move forward or would like us to understand your
              requirements in more detail, you can proceed to our Client Intake
              Form.
            </p>

            <Link href="/intake">
              <Button size="sm">Proceed to Client Intake</Button>
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  );
}
