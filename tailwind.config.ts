import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep dark backgrounds
        "deep-navy": "#05061a",
        "dark-purple": "#0d0b2b",
        "mid-purple": "#1a1550",
        "card-bg": "rgba(20, 16, 60, 0.7)",
        // Cyan / neon-blue accents
        "neon-cyan": "#00e5ff",
        "neon-blue": "#3b82f6",
        "glow-purple": "#7c3aed",
        "soft-cyan": "#67e8f9",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #05061a 0%, #0d0b2b 40%, #1a1550 70%, #0d0b2b 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(0,229,255,0.08) 100%)",
        "btn-gradient":
          "linear-gradient(135deg, #00e5ff 0%, #3b82f6 50%, #7c3aed 100%)",
      },
      boxShadow: {
        "neon-cyan": "0 0 20px rgba(0, 229, 255, 0.5), 0 0 40px rgba(0, 229, 255, 0.2)",
        "neon-purple": "0 0 20px rgba(124, 58, 237, 0.5), 0 0 40px rgba(124, 58, 237, 0.2)",
        "card-glow": "0 0 30px rgba(0, 229, 255, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
        "btn-glow": "0 0 25px rgba(0, 229, 255, 0.6), 0 4px 20px rgba(59, 130, 246, 0.4)",
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(0,229,255,0.3), 0 0 30px rgba(0,229,255,0.1)" },
          "50%": { boxShadow: "0 0 30px rgba(0,229,255,0.6), 0 0 60px rgba(0,229,255,0.3)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
