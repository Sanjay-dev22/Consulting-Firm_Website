"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function IntakeFormPage() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    business_name: "",
    service_interest: "",
    annual_revenue: "",
    location: "",
    comments: "",
    consent: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Submission failed");

      setSuccess("Thank you! Your details have been submitted successfully.");
      setForm({
        full_name: "",
        email: "",
        phone: "",
        business_name: "",
        service_interest: "",
        annual_revenue: "",
        location: "",
        comments: "",
        consent: false,
      });
   } catch (err) {
  const message =
    err instanceof Error ? err.message : "Something went wrong";
  setError(message);
}
 finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">
        Client Intake Form
      </h1>
      <p className="text-gray-600 mb-8">
        Help us understand your business and requirements so we can serve you
        better.
      </p>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
      >
        <Input
          name="full_name"
          placeholder="Full Name"
          required
          value={form.full_name}
          onChange={handleChange}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email Address"
          required
          value={form.email}
          onChange={handleChange}
        />
        <Input
          name="phone"
          placeholder="Phone Number"
          required
          value={form.phone}
          onChange={handleChange}
        />
        <Input
          name="business_name"
          placeholder="Business Name (if any)"
          value={form.business_name}
          onChange={handleChange}
        />

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What services are you interested in?
          </label>
          <select
            name="service_interest"
            className="w-full border p-3 rounded-md"
            value={form.service_interest}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Accounting & Bookkeeping</option>
            <option>Virtual CFO</option>
            <option>Tax & Compliance</option>
            <option>Business Setup</option>
            <option>Payroll & HR</option>
            <option>International Services</option>
          </select>
        </div>

        <Input
          name="annual_revenue"
          placeholder="Estimated Annual Revenue"
          value={form.annual_revenue}
          onChange={handleChange}
        />
        <Input
          name="location"
          placeholder="Location (City, Country)"
          value={form.location}
          onChange={handleChange}
        />

        <div className="md:col-span-2">
          <textarea
            name="comments"
            rows={4}
            className="w-full p-3 border rounded-md"
            placeholder="Any deadlines or additional comments?"
            value={form.comments}
            onChange={handleChange}
          />
        </div>

        <div className="md:col-span-2 flex items-center space-x-2 text-sm text-gray-600">
          <input
            type="checkbox"
            name="consent"
            required
            checked={form.consent}
            onChange={handleChange}
          />
          <label>
            I allow this website to store my submission so they can respond to my
            inquiry.
          </label>
        </div>

        {error && (
          <p className="md:col-span-2 text-red-600 text-sm">{error}</p>
        )}
        {success && (
          <p className="md:col-span-2 text-green-600 text-sm">{success}</p>
        )}

        <Button
          className="md:col-span-2 w-full text-lg"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Form"}
        </Button>
      </form>
    </main>
  );
}
