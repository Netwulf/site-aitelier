import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
        // Cores específicas do Brutalismo Poético
        "brutal-black": "hsl(var(--brutal-black))",
        "brutal-white": "hsl(var(--brutal-white))",
        "matrix-green": "hsl(var(--matrix-green))",
        "matrix-glow": "hsl(var(--matrix-glow))",
        "concrete-gray": "hsl(var(--concrete-gray))",
        "concrete-border": "hsl(var(--concrete-border))",
        // Futuro Ancestral Colors
        "ancestral-black": "#0a0a0a",
        "ancestral-white": "#f5f5f0",
        "stone-dark": "#1a1a1a",
        "stone-mid": "#2a2a2a",
        "stone-light": "#e5e5e0",
        // V3 Twilight Violet Palette
        "twilight-violet": "#261833",
        "violet-mist": "rgba(38, 24, 51, 0.3)",
        "violet-deep": "#1A1025",
        "violet-glow": "#2E1A47",
        // V3 Standardized Names
        "void-black": "#0a0a0a",
        "warm-ivory": "#f5f5f0",
        "tech-olive": "#8dc75e",
        // V3 Text Hierarchy
        "text-secondary": "#a0a0a0",
        "text-muted": "#666666",
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        serif: ['Georgia', '"Times New Roman"', 'serif'],
        mono: ['"Courier New"', 'Courier', 'monospace'],
        // Futuro Ancestral Typography
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        'mono-v2': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': 'clamp(3rem, 8vw, 8rem)',
        'display-1': 'clamp(2rem, 5vw, 4rem)',
        'display-2': 'clamp(1.5rem, 3vw, 2.5rem)',
      },
      spacing: {
        'section': 'clamp(4rem, 10vh, 8rem)',
        'element': 'clamp(1rem, 3vh, 2rem)',
      },
      maxWidth: {
        'container': '1400px',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
