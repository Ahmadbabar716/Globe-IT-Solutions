"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid password.");
      } else {
        router.refresh(); // Re-render server component to show dashboard
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center px-4">
      {/* Background glows */}
      <div className="pointer-events-none fixed top-1/4 left-1/4 h-96 w-96 rounded-full bg-glow-purple/20 blur-[100px]" />
      <div className="pointer-events-none fixed bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-neon-cyan/10 blur-[100px]" />

      <div className="relative w-full max-w-md">
        <div className="overflow-hidden rounded-2xl border border-neon-cyan/30 bg-card-bg backdrop-blur-xl p-8 shadow-card-glow">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-neon-cyan/30 to-glow-purple/30 border border-neon-cyan/40 shadow-neon-cyan">
              <svg className="h-7 w-7 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-gray-400">Globe IT Solutions</p>
          </div>

          <form id="admin-login-form" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-gray-300 mb-1.5">
                Admin Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-neon-cyan/60 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] text-sm"
                autoComplete="current-password"
                required
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                ⚠️ {error}
              </div>
            )}

            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-btn-gradient py-3.5 text-sm font-bold text-deep-navy shadow-btn-glow transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,229,255,0.8)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
