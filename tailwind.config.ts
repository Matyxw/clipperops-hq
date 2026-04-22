import type { Config } from "tailwindcss";

const config: Config = {
  // FIX: ./src/**/* ya cubre todos los subdirectorios recursivamente.
  // Las otras tres entradas eran redundantes y alargaban el escaneo.
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],

  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        accent: {
          mint:  "hsl(var(--accent-mint))",
          cyan:  "#00d1ff",
          hover: "rgba(0, 255, 195, 0.1)",
        },
        surface:       "#0a0a0a",
        "glass-border": "rgba(255, 255, 255, 0.08)",
        "glass-bg":     "rgba(255, 255, 255, 0.03)",
        muted:         "#a1a1aa",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-glow":   "conic-gradient(from 180deg at 50% 50%, #00ffc333 0deg, #00d1ff33 180deg, transparent 360deg)",
      },
      animation: {
        "scan-line":   "scan 3s linear infinite",
        "fade-in-up":  "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        // FIX: pulse-slow referenciaba el keyframe built-in "pulse" de Tailwind
        // pero con duración customizada. Definimos el keyframe explícitamente
        // para no depender de que Tailwind lo resuelva correctamente.
        "pulse-slow":  "pulseSlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        scan: {
          "0%":   { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)"  },
        },
        fadeInUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
        // FIX: keyframe propio en lugar de depender del nombre "pulse" de Tailwind
        pulseSlow: {
          "0%, 100%": { opacity: "1"   },
          "50%":      { opacity: "0.4" },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-mint":        "0 0 20px rgba(0, 255, 195, 0.15)",
        "glow-mint-strong": "0 0 30px rgba(0, 255, 195, 0.40)",
      },
    },
  },
  plugins: [],
};

export default config;