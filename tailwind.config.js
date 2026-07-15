/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        // 珊瑚橙主色 — 电商活力感
        coral: {
          50: "#FFF1ED",
          100: "#FFE0D6",
          200: "#FFC2AD",
          300: "#FF9B7A",
          400: "#FF7452",
          500: "#FF5A3C",
          600: "#ED3D1C",
          700: "#C52E12",
          800: "#9C2510",
          900: "#7E2110",
        },
        // 深石板 — 文字与深色块
        slatey: {
          50: "#F5F6F8",
          100: "#E9EBEF",
          200: "#D2D6DE",
          300: "#A8B0BE",
          400: "#6B7388",
          500: "#3D4360",
          600: "#2A2F48",
          700: "#1F2338",
          800: "#1A1D2E",
          900: "#13151F",
        },
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', "system-ui", "sans-serif"],
        serif: ['"Noto Serif SC"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(26,29,46,0.04), 0 4px 12px rgba(26,29,46,0.06)",
        cardHover: "0 2px 6px rgba(26,29,46,0.08), 0 12px 28px rgba(26,29,46,0.10)",
        pop: "0 8px 32px rgba(255,90,60,0.22)",
      },
      borderRadius: {
        xl: "10px",
        "2xl": "14px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s cubic-bezier(0.22,1,0.36,1) both",
        "pop-in": "pop-in 0.35s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};
