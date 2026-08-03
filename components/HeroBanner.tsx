import React from "react";

// Decorative SVG circuit-board lines (pure CSS/SVG, no external dependency)
function CircuitDecor({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M10 100 H50 V40 H100" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
      <circle cx="100" cy="40" r="4" fill="currentColor" opacity="0.6" />
      <path d="M100 40 H160 V80 H190" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
      <circle cx="190" cy="80" r="3" fill="currentColor" opacity="0.5" />
      <path d="M30 160 H80 V120 H140 V150 H180" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.3" />
      <circle cx="30" cy="160" r="4" fill="currentColor" opacity="0.5" />
      <circle cx="180" cy="150" r="3" fill="currentColor" opacity="0.4" />
      <path d="M5 50 V90 H30" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
      <path d="M170 10 H150 V50 H120" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
    </svg>
  );
}

export default function HeroBanner() {
  return (
    <section id="hero" className="relative w-full overflow-hidden py-16 md:py-24 text-center">
      {/* Circuit board decorations */}
      <CircuitDecor className="absolute left-0 top-0 h-48 w-48 text-neon-cyan opacity-60 pointer-events-none" />
      <CircuitDecor className="absolute right-0 bottom-0 h-48 w-48 text-glow-purple opacity-50 pointer-events-none rotate-180" />
      <CircuitDecor className="absolute right-8 top-4 h-32 w-32 text-neon-cyan opacity-30 pointer-events-none" />

      {/* Floating glow orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-glow-purple/20 blur-[80px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-neon-cyan/15 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4">
        {/* Top label */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-neon-cyan shadow-neon-cyan/20">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-neon-cyan animate-pulse" />
          Now Enrolling — August 2026 Batch
        </div>

        {/* Main headline */}
        <h1 className="mb-4 text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-white">
          MASTER THE
          <br />
          <span
            className="bg-gradient-to-r from-neon-cyan via-blue-400 to-glow-purple bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,229,255,0.6)]"
          >
            FUTURE OF TECH
          </span>
        </h1>

        {/* Subheading */}
        <p className="mb-8 text-lg md:text-2xl font-medium text-soft-cyan drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">
          with{" "}
          <span className="font-bold text-white">Globe IT Solutions</span>
        </p>

        {/* Instructor badge */}
        <div className="mx-auto mb-10 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm">
          {/* Avatar */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-neon-cyan to-glow-purple shadow-neon-cyan">
            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-400 leading-none mb-0.5">Your Instructor</p>
            <p className="font-bold text-white text-sm">Qaiser Riaz</p>
          </div>
          <div className="ml-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-1 text-xs font-semibold text-emerald-400">
            Expert
          </div>
        </div>

        {/* Highlight pills */}
        <div className="flex flex-wrap justify-center gap-3">
          <div className="animate-pulse-glow inline-flex items-center gap-2 rounded-full border border-neon-cyan/40 bg-neon-cyan/10 px-5 py-2.5 text-sm font-semibold text-neon-cyan shadow-neon-cyan">
            🎯 Limited Seats: Only 25 Students
          </div>
          <div className="animate-pulse-glow inline-flex items-center gap-2 rounded-full border border-glow-purple/40 bg-glow-purple/10 px-5 py-2.5 text-sm font-semibold text-purple-300 shadow-neon-purple"
            style={{ animationDelay: "1s" }}>
            💼 Top Performers Get Hired by Partner Companies!
          </div>
        </div>
      </div>
    </section>
  );
}
