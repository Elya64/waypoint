import type { Config } from "tailwindcss";

/**
 * Waypoint Tailwind config.
 * Colors are driven by the Obra shadcn/ui CSS variables defined in globals.css
 * so the design tokens stay the single source of truth (light + dark themes).
 */
const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        destructive: "var(--destructive)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        positive: "var(--positive)",
        warning: "var(--warning)",
        success: "var(--success)",
        // brand ("trust blue") accent
        ac: "var(--ac)",
        "ac-soft": "var(--ac-soft)",
        "ac-border": "var(--ac-border)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        editorial: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        full: "var(--radius-full)",
      },
      keyframes: {
        screenIn: { from: { transform: "translateY(10px)" }, to: { transform: "translateY(0)" } },
        fadeUp: { from: { opacity: "0", transform: "translateY(10px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        popIn: { from: { opacity: "0", transform: "scale(.96)" }, to: { opacity: "1", transform: "scale(1)" } },
        drift: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
        spin: { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        screenIn: "screenIn .42s cubic-bezier(.2,.7,.2,1) both",
        fadeUp: "fadeUp .5s both",
        popIn: "popIn .5s .25s both",
        drift: "drift 2.4s ease-in-out infinite",
        spin: "spin .7s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
