"use client";

import { useEffect, useMemo, useState } from "react";

/* ---------------- Types ---------------- */

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  created_at: string;
};

type IntakeSubmission = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  business_name?: string;
  service_interest?: string;
  annual_revenue?: string;
  location?: string;
  comments?: string;
  status: string;
  created_at: string;
};

type Props = {
  contacts: ContactSubmission[];
  intakes: IntakeSubmission[];
};

/* ---------------- Constants ---------------- */

const STATUSES = ["New", "Contacted", "Closed"] as const;

const STATUS_COLORS: Record<string, string> = {
  New: "bg-blue-100 text-blue-700 border-blue-300",
  Contacted: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Closed: "bg-green-100 text-green-700 border-green-300",
};

/* Deterministic date formatter (hydration-safe) */
const formatDate = (iso: string) =>
  new Date(iso).toISOString().replace("T", " ").slice(0, 19);

/* ---------------- Component ---------------- */

export default function AdminClient({
  contacts: initialContacts,
  intakes: initialIntakes,
}: Props) {
  /* Local state (for live status updates) */
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [intakes, setIntakes] = useState<IntakeSubmission[]>([]);

  useEffect(() => {
    setContacts(initialContacts);
    setIntakes(initialIntakes);
  }, [initialContacts, initialIntakes]);

  /* Filters */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState<"Newest" | "Oldest">("Newest");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  /* ---------------- Date helpers ---------------- */

  const isWithinDate = (createdAt: string) => {
    const ts = new Date(createdAt).getTime();
    if (fromDate && ts < new Date(fromDate).getTime()) return false;
    if (toDate && ts > new Date(toDate).getTime() + 86400000) return false;
    return true;
  };

  const applyQuickDate = (days: number | null) => {
    if (days === null) {
      setFromDate("");
      setToDate("");
      return;
    }
    const now = new Date();
    const from = new Date();
    from.setDate(now.getDate() - days);
    setFromDate(from.toISOString().slice(0, 10));
    setToDate(now.toISOString().slice(0, 10));
  };

  /* ---------------- Status Update (Optimistic) ---------------- */

  const updateStatus = async (
    table: "contact_submissions" | "intake_submissions",
    id: string,
    status: string
  ) => {
    if (table === "contact_submissions") {
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      );
    } else {
      setIntakes((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status } : i))
      );
    }

    await fetch("/api/admin/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table, id, status }),
    });
  };

  /* ---------------- Filtered Data ---------------- */

  const filteredContacts = useMemo(() => {
    return contacts
      .filter((c) => {
        const matchesSearch =
          !search ||
          [c.name, c.email, c.phone, c.message]
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesStatus =
          statusFilter === "All" || c.status === statusFilter;

        return matchesSearch && matchesStatus && isWithinDate(c.created_at);
      })
      .sort((a, b) =>
        sortOrder === "Newest"
          ? new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
          : new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
      );
  }, [contacts, search, statusFilter, sortOrder, isWithinDate]);

  const filteredIntakes = useMemo(() => {
    return intakes
      .filter((i) => {
        const matchesSearch =
          !search ||
          [
            i.full_name,
            i.email,
            i.phone,
            i.business_name,
            i.location,
            i.comments,
          ]
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesStatus =
          statusFilter === "All" || i.status === statusFilter;

        const matchesService =
          serviceFilter === "All" ||
          i.service_interest === serviceFilter;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesService &&
          isWithinDate(i.created_at)
        );
      })
      .sort((a, b) =>
        sortOrder === "Newest"
          ? new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
          : new Date(a.created_at).getTime() -
            new Date(b.created_at).getTime()
      );
  }, [intakes, search, statusFilter, serviceFilter, sortOrder, isWithinDate]);

  const services = Array.from(
    new Set(
      intakes
        .map((i) => i.service_interest)
        .filter((s): s is string => typeof s === "string")
    )
  );

  /* ---------------- Status Dropdown ---------------- */

  function StatusDropdown({
    item,
    table,
  }: {
    item: { id: string; status: string };
    table: "contact_submissions" | "intake_submissions";
  }) {
    return (
      <select
        value={item.status}
        onChange={(e) => updateStatus(table, item.id, e.target.value)}
        className={`text-xs px-2 py-1 rounded border ${
          STATUS_COLORS[item.status] || "bg-gray-100"
        }`}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <>
      {/* FILTER BAR */}
      <div className="bg-gray-50 border rounded-lg p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          <input
            placeholder="Search…"
            className="border px-3 py-2 rounded md:col-span-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border px-2 py-2 rounded"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            className="border px-2 py-2 rounded"
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
          >
            <option value="All">All Services</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            className="border px-2 py-2 rounded"
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "Newest" | "Oldest")
            }
          >
            <option>Newest</option>
            <option>Oldest</option>
          </select>

          <input
            type="date"
            className="border px-2 py-2 rounded"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <input
            type="date"
            className="border px-2 py-2 rounded"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <div className="flex gap-2 mt-4">
          <button onClick={() => applyQuickDate(null)} className="border px-3 py-1 rounded text-sm">
            All
          </button>
          <button onClick={() => applyQuickDate(0)} className="border px-3 py-1 rounded text-sm">
            Today
          </button>
          <button onClick={() => applyQuickDate(7)} className="border px-3 py-1 rounded text-sm">
            Last 7 days
          </button>
        </div>
      </div>

      {/* CONTACTS */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">
          Contact Submissions ({filteredContacts.length})
        </h2>

        {filteredContacts.map((c) => (
          <div key={c.id} className="border rounded-lg p-5 bg-white shadow-sm">
            <div className="flex flex-wrap gap-4 items-center text-sm mb-3">
              <strong>{c.name}</strong>
              <span>{c.email}</span>
              <span>{c.phone}</span>
              <StatusDropdown item={c} table="contact_submissions" />
              <span className="ml-auto text-gray-500">
                {formatDate(c.created_at)}
              </span>
            </div>
            <p className="whitespace-pre-wrap">{c.message}</p>
          </div>
        ))}
      </section>

      {/* INTAKES */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">
          Intake Submissions ({filteredIntakes.length})
        </h2>

        {filteredIntakes.map((i) => (
          <details key={i.id} className="border rounded-lg p-4 bg-white shadow-sm">
            <summary className="flex gap-3 items-center cursor-pointer">
              <strong>{i.full_name}</strong>
              <span>{i.email}</span>
              <span>{i.service_interest}</span>
              <StatusDropdown item={i} table="intake_submissions" />
              <span className="ml-auto text-gray-500">
                {formatDate(i.created_at)}
              </span>
            </summary>

            <div className="mt-3 text-sm space-y-1">
              <p><strong>Phone:</strong> {i.phone}</p>
              <p><strong>Business:</strong> {i.business_name || "-"}</p>
              <p><strong>Revenue:</strong> {i.annual_revenue || "-"}</p>
              <p><strong>Location:</strong> {i.location || "-"}</p>
              <p className="whitespace-pre-wrap">
                <strong>Comments:</strong> {i.comments || "-"}
              </p>
            </div>
          </details>
        ))}
      </section>
    </>
  );
}
