"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

type ContactFormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormState>({
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

      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
        consent: false,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Contact Us</h1>

      <p className="text-gray-600 mb-10">
        We&rsquo;d love to hear from you. Whether you have a question about our
        services or want to explore how we can help your business, our team is
        ready to assist.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex gap-4">
            <Mail className="text-green-600 w-6 h-6" />
            <div>
              <p className="font-semibold">Email</p>
              <a
                href="mailto:nharuviglobal@gmail.com"
                className="text-green-700 hover:underline"
              >
                nharuviglobal@gmail.com
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <Phone className="text-green-600 w-6 h-6" />
            <div>
              <p className="font-semibold">Phone</p>
              <p>+91 80569 95508</p>
            </div>
          </div>

          <div className="flex gap-4">
            <MapPin className="text-green-600 w-6 h-6" />
            <div>
              <p className="font-semibold">Office Location</p>
              <p>Bengaluru, Karnataka, India</p>
            </div>
          </div>
        </div>

        {/* Form */}
        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" placeholder="Your Name" required value={form.name} onChange={handleChange} />
            <Input name="email" type="email" placeholder="Email Address" required value={form.email} onChange={handleChange} />
            <Input name="phone" placeholder="Phone Number" required value={form.phone} onChange={handleChange} />

            <textarea
              name="message"
              rows={4}
              className="w-full p-3 border rounded-md"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
            />

            <label className="flex gap-2 text-sm">
              <input type="checkbox" name="consent" required checked={form.consent} onChange={handleChange} />
              I allow this website to store my submission.
            </label>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <Button disabled={loading} className="w-full text-lg">
              {loading ? "Submitting…" : "Send Message"}
            </Button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-6"
          >
            <p className="text-green-700 font-semibold">
              ✅ Message sent successfully
            </p>

            <Link href="/intake">
              <Button size="sm" className="mt-4">
                Proceed to Client Intake
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  );
}
