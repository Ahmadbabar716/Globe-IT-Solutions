"use client";

import { useState } from "react";

export default function PdfExportButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleExport() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/export-pdf");
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Failed to export PDF.");
        return;
      }

      // Trigger browser download
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `globe-it-registrations-${new Date().toISOString().split("T")[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        id="export-pdf-btn"
        onClick={handleExport}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-xl border border-neon-cyan/30 bg-neon-cyan/10 px-5 py-2.5 text-sm font-semibold text-neon-cyan shadow-neon-cyan transition-all duration-200 hover:bg-neon-cyan/20 hover:border-neon-cyan/60 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Generating PDF...
          </>
        ) : (
          <>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download All Registrations (PDF)
          </>
        )}
      </button>
      {error && <p className="text-xs text-red-400">⚠️ {error}</p>}
    </div>
  );
}
