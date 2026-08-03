import HeroBanner from "@/components/HeroBanner";
import CourseGrid from "@/components/CourseGrid";
import InfoBar from "@/components/InfoBar";
import RegistrationForm from "@/components/RegistrationForm";

export default function HomePage() {
  return (
    <main className="relative min-h-screen circuit-bg overflow-x-hidden" style={{
      background: "linear-gradient(135deg, #05061a 0%, #0d0b2b 40%, #1a1550 70%, #0d0b2b 100%)"
    }}>
      {/* Ambient background glow orbs */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-glow-purple/10 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 h-[400px] w-[400px] rounded-full bg-neon-cyan/8 blur-[120px]" />
        <div className="absolute -bottom-40 left-1/3 h-[400px] w-[400px] rounded-full bg-neon-blue/8 blur-[120px]" />
      </div>

      {/* ---- Hero ---- */}
      <HeroBanner />

      {/* ---- Main content grid ---- */}
      <div className="relative mx-auto max-w-7xl px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left column: Course grid (spans 2/3) */}
          <div className="lg:col-span-2 space-y-10">
            <CourseGrid />
          </div>

          {/* Right column: Info bar */}
          <div className="lg:col-span-1">
            <InfoBar />
          </div>
        </div>

        {/* ---- Divider ---- */}
        <div className="my-14 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
          <span className="text-neon-cyan text-sm font-semibold uppercase tracking-widest px-2">
            Secure Your Spot
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
        </div>

        {/* ---- Registration Form ---- */}
        <div className="mx-auto max-w-2xl">
          <RegistrationForm />
        </div>
      </div>

      {/* ---- Footer ---- */}
      <footer id="footer" className="relative border-t border-white/8 bg-black/20 backdrop-blur-sm py-8 px-4 text-center">
        <p className="text-lg font-bold text-white mb-2">Globe IT Solutions</p>
        <p className="text-sm text-gray-400 mb-4">
          Empowering Pakistan&apos;s next generation of tech professionals.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <a
            href="tel:+923041641062"
            className="inline-flex items-center gap-2 text-neon-cyan hover:text-white transition-colors"
          >
            📞 +92 304 1641062
          </a>
          <span className="text-gray-600">|</span>
          <a
            href="tel:+923350667791"
            className="inline-flex items-center gap-2 text-neon-cyan hover:text-white transition-colors"
          >
            📞 +92 335 0667791
          </a>
        </div>
        <p className="mt-6 text-xs text-gray-600">
          © {new Date().getFullYear()} Globe IT Solutions. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
