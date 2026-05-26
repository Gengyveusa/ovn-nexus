import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Inter",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        // Apple-ish display sizing for hero headlines
        "display-sm": ["2.5rem", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        "display": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.035em" }],
        "display-lg": ["4.5rem", { lineHeight: "1.02", letterSpacing: "-0.04em" }],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,15,20,0.04), 0 8px 24px rgba(15,15,20,0.06)",
        lift: "0 2px 4px rgba(15,15,20,0.06), 0 16px 40px rgba(15,15,20,0.10)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
