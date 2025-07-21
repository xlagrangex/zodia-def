import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Palette colori esatti
        "blue-primary-neon": "#0066FF",
        "cyan-electric": "#00CCFF",
        "blue-dark-deep": "#001133",
        "white-pure": "#FFFFFF",
        "azure-ice": "#E6F3FF",
        "black-space": "#000011",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0066FF", // Mapped to primary neon
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        // Inter come font principale (stabile e affidabile)
        trajan: ["var(--font-trajan)", "Inter", "system-ui", "sans-serif"],
        serif: ["Georgia", "serif"],
        sans: ["Arial", "sans-serif"],
        mono: ["monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Effetti luminosi ultra-precisi e animazioni
        pulsate: {
          "0%, 100%": { opacity: "0.7" },
          "50%": { opacity: "1.0" },
        },
        "light-slash": {
          "0%": { transform: "translateX(-100%) translateY(-100%) rotate(45deg)" },
          "100%": { transform: "translateX(100%) translateY(100%) rotate(45deg)" },
        },
        "light-slash-center": {
          "0%": { transform: "translateX(-50%) translateY(-50%) rotate(45deg)" },
          "100%": { transform: "translateX(50%) translateY(50%) rotate(45deg)" },
        },
        "light-slash-portal": {
          "0%": { transform: "translateX(-100%) translateY(-100%) rotate(45deg)" },
          "100%": { transform: "translateX(100%) translateY(100%) rotate(45deg)" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        "fade-in-stagger": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "brownian-motion": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(var(--random-x-1), var(--random-y-1))" },
          "50%": { transform: "translate(var(--random-x-2), var(--random-y-2))" },
          "75%": { transform: "translate(var(--random-x-3), var(--random-y-3))" },
        },
        flicker: {
          "0%, 100%": { opacity: "var(--initial-opacity)" },
          "50%": { opacity: "calc(var(--initial-opacity) * 1.5)" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "rotate-slow-reverse": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "scale-breathing": {
          "0%, 100%": { transform: "scale(0.95)" },
          "50%": { transform: "scale(1.05)" },
        },
        "float-3d": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px) translateZ(0px)", opacity: "0.2" },
          "25%": { transform: "translateY(-30px) translateX(20px) translateZ(10px)", opacity: "0.4" },
          "50%": { transform: "translateY(-15px) translateX(-15px) translateZ(-5px)", opacity: "0.3" },
          "75%": { transform: "translateY(-40px) translateX(10px) translateZ(15px)", opacity: "0.5" },
        },
        "energy-wave": {
          "0%": { transform: "translate(-50%, -50%) scale(0.5)", opacity: "0.8" },
          "50%": { transform: "translate(-50%, -50%) scale(1)", opacity: "0.4" },
          "100%": { transform: "translate(-50%, -50%) scale(1.5)", opacity: "0" },
        },
        "nebula-title": {
          "0%, 100%": {
            filter: "drop-shadow(0 0 30px #0066FF) drop-shadow(0 0 60px #00CCFF)",
            transform: "scale(1) perspective(1000px) rotateX(0deg)",
          },
          "50%": {
            filter: "drop-shadow(0 0 50px #0066FF) drop-shadow(0 0 100px #00CCFF)",
            transform: "scale(1.03) perspective(1000px) rotateX(2deg)",
          },
        },
        "line-glow": {
          "0%, 100%": { boxShadow: "0 0 10px #00CCFF", transform: "scaleX(1)" },
          "50%": { boxShadow: "0 0 30px #00CCFF, 0 0 50px #0066FF", transform: "scaleX(1.2)" },
        },
        "immersion-button": {
          "0%, 100%": { transform: "translateY(0px) scale(1)", boxShadow: "0 0 40px #0066FF" },
          "50%": { transform: "translateY(-3px) scale(1.02)", boxShadow: "0 0 60px #0066FF, 0 0 80px #00CCFF" },
        },
        "depth-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.5)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pulsate: "pulsate 2s ease-in-out infinite alternate",
        "light-slash": "light-slash 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "light-slash-center": "light-slash-center 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "light-slash-portal": "light-slash-portal 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        blink: "blink 1s infinite",
        "fade-in-stagger": "fade-in-stagger 1s ease-out forwards",
        "brownian-motion": "brownian-motion var(--animation-duration) ease-in-out infinite alternate",
        flicker: "flicker var(--animation-duration) ease-in-out infinite alternate",
        "rotate-slow": "rotate-slow 60s linear infinite",
        "rotate-slow-reverse": "rotate-slow-reverse 60s linear infinite",
        "scale-breathing": "scale-breathing 5s ease-in-out infinite alternate",
        "float-3d": "float-3d 8s ease-in-out infinite",
        "energy-wave": "energy-wave 8s ease-out infinite",
        "nebula-title": "nebula-title 5s ease-in-out infinite",
        "line-glow": "line-glow 3s ease-in-out infinite",
        "immersion-button": "immersion-button 4s ease-in-out infinite",
        "depth-pulse": "depth-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
