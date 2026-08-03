"use client";

import { useState, useMemo } from "react";
import WhatsAppButton from "./WhatsAppButton";
import PdfExportButton from "./PdfExportButton";
import { useRouter } from "next/navigation";

export type Registration = {
  id: string;
  name: string;
  fatherName: string;
  phone: string;
  cnic: string;
  address: string;
  course: string;
  status: string;
  createdAt: string;
};

const TOTAL_SEATS = 25;

export default function AdminTable({ initialRegistrations }: { initialRegistrations: Registration[] }) {
  const [registrations, setRegistrations] = useState<Registration[]>(initialRegistrations);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const router = useRouter();

  // --- Filter ---
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return registrations;
    return registrations.filter(
      (r) => r.name.toLowerCase().includes(q) || r.phone.includes(q)
    );
  }, [registrations, search]);

  const confirmedCount = registrations.filter((r) => r.status === "confirmed").length;
  const seatsRemaining = Math.max(0, TOTAL_SEATS - registrations.length);

  // --- Mark as Paid / Pending toggle ---
  async function toggleStatus(id: string, current: string) {
    const newStatus = current === "confirmed" ? "pending" : "confirmed";
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/registrations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setRegistrations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  }

  // --- Logout ---
  async function handleLogout() {
    setLogoutLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  const dateStr = (iso: string) =>
    new Date(iso).toLocaleDateString("en-PK", {
      timeZone: "Asia/Karachi",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="min-h-screen bg-hero-gradient">
      <div className="mx-auto max-w-[1400px] px-4 py-8">

        {/* ---- Header ---- */}
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">
              Admin Dashboard
              <span className="ml-2 text-neon-cyan">⚡</span>
            </h1>
            <p className="mt-1 text-sm text-gray-400">Globe IT Solutions — Course Registrations</p>
          </div>
          <button
            id="logout-btn"
            onClick={handleLogout}
            disabled={logoutLoading}
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/20 hover:scale-105"
          >
            {logoutLoading ? "Logging out..." : "Log Out"}
          </button>
        </div>

        {/* ---- Stats row ---- */}
        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Registrations", value: registrations.length, color: "text-white" },
            { label: "Confirmed / Paid", value: confirmedCount, color: "text-emerald-400" },
            { label: "Pending", value: registrations.length - confirmedCount, color: "text-yellow-400" },
            { label: "Seats Remaining", value: seatsRemaining, color: seatsRemaining === 0 ? "text-red-400" : "text-neon-cyan" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm px-5 py-4">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{stat.label}</p>
              <p className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* ---- Seat counter ---- */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">
              <span className="font-bold text-white">{registrations.length}</span> / {TOTAL_SEATS} seats filled
            </span>
            <div className="h-2 w-40 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-glow-purple transition-all duration-700"
                style={{ width: `${Math.min(100, (registrations.length / TOTAL_SEATS) * 100)}%` }}
              />
            </div>
          </div>
          <PdfExportButton />
        </div>

        {/* ---- Data note ---- */}
        <div className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-2.5 text-xs text-emerald-400 flex items-center gap-2">
          <svg className="h-3.5 w-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          All registration data is permanently stored and will <strong>not</strong> be deleted automatically.
          Data is only removed if you explicitly add a delete button in the future.
        </div>

        {/* ---- Search ---- */}
        <div className="mb-5">
          <div className="relative max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              id="admin-search"
              type="text"
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-neon-cyan/60 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.1)]"
            />
          </div>
        </div>

        {/* ---- Desktop Table ---- */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 bg-white/5">
                  {["Name", "Father Name", "Phone", "CNIC", "Address", "Course", "Status", "Registered On", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center text-gray-500">
                      {search ? "No registrations match your search." : "No registrations yet."}
                    </td>
                  </tr>
                ) : (
                  filtered.map((r, i) => (
                    <tr
                      key={r.id}
                      className={`border-b border-white/5 transition-colors hover:bg-white/4 ${i % 2 === 0 ? "" : "bg-white/[0.02]"}`}
                    >
                      <td className="px-4 py-3 font-medium text-white whitespace-nowrap">{r.name}</td>
                      <td className="px-4 py-3 text-gray-300 whitespace-nowrap">{r.fatherName}</td>
                      <td className="px-4 py-3 text-gray-300 whitespace-nowrap font-mono text-xs">{r.phone}</td>
                      <td className="px-4 py-3 text-gray-300 whitespace-nowrap font-mono text-xs">{r.cnic}</td>
                      <td className="px-4 py-3 text-gray-400 max-w-[160px] truncate" title={r.address}>{r.address}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="rounded-full border border-neon-blue/30 bg-neon-blue/10 px-2.5 py-1 text-xs text-blue-300">
                          {r.course}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <StatusBadge status={r.status} />
                      </td>
                      <td className="px-4 py-3 text-gray-400 whitespace-nowrap text-xs">{dateStr(r.createdAt)}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <WhatsAppButton name={r.name} phone={r.phone} />
                          <button
                            onClick={() => toggleStatus(r.id, r.status)}
                            disabled={updatingId === r.id}
                            className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-60 ${
                              r.status === "confirmed"
                                ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
                                : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                            }`}
                          >
                            {updatingId === r.id ? "..." : r.status === "confirmed" ? "↩ Unconfirm" : "✓ Mark Paid"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---- Mobile Card View ---- */}
        <div className="md:hidden space-y-4">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-white/8 bg-white/4 p-8 text-center text-gray-500">
              {search ? "No registrations match your search." : "No registrations yet."}
            </div>
          ) : (
            filtered.map((r) => (
              <div key={r.id} className="rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-white">{r.name}</p>
                    <p className="text-xs text-gray-400">Father: {r.fatherName}</p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p className="text-gray-200 font-mono">{r.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">CNIC</p>
                    <p className="text-gray-200 font-mono">{r.cnic}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Course</p>
                    <p className="text-blue-300">{r.course}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Registered</p>
                    <p className="text-gray-300">{dateStr(r.createdAt)}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">Address</p>
                    <p className="text-gray-300">{r.address}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <WhatsAppButton name={r.name} phone={r.phone} />
                  <button
                    onClick={() => toggleStatus(r.id, r.status)}
                    disabled={updatingId === r.id}
                    className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold transition-all disabled:opacity-60 ${
                      r.status === "confirmed"
                        ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                        : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    }`}
                  >
                    {updatingId === r.id ? "Updating..." : r.status === "confirmed" ? "↩ Unconfirm" : "✓ Mark Paid"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <p className="mt-6 text-center text-xs text-gray-600">
          Showing {filtered.length} of {registrations.length} registration{registrations.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "confirmed") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        Confirmed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-1 text-xs font-semibold text-yellow-400">
      <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
      Pending
    </span>
  );
}
