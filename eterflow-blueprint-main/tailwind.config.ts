
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// BRUTALISTA TECH ANCESTRAL - Olive Green System
				olive: {
					DEFAULT: '#8dc75e',
					50: '#f4f9ef',
					100: '#e6f2db',
					200: '#cee5b8',
					300: '#aed38b',
					400: '#8dc75e', // Primary
					500: '#6fa843',
					600: '#568533',
					700: '#43662b',
					800: '#385226',
					900: '#304523',
					950: '#17250f'
				},
				// Violet - Accent Raro (pontual)
				violet: {
					DEFAULT: '#7C3AED',
					light: '#A78BFA',
					dark: '#5B21B6'
				},
				// Neutral System - Preto Puro ao Branco
				neutral: {
					0: '#000000',    // Preto puro
					50: '#0A0A0A',   // Quase preto
					100: '#141414',  // Card dark
					150: '#1A1A1A',  // Card medium
					200: '#262626',  // Border dark
					300: '#404040',  // Muted
					400: '#737373',  // Text secondary
					500: '#A3A3A3',  // Text muted
					600: '#D4D4D4',  // Text light
					700: '#E5E5E5',  // Border light
					800: '#F5F5F0',  // Background light (cream)
					900: '#FAF8F5',  // Background cream
					950: '#FEFCF9',  // Almost white
					1000: '#FFFFFF'  // Branco puro
				}
			},
			fontFamily: {
				// Brutalista Typography Stack
				'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
				'sans': ['Inter', 'system-ui', 'sans-serif'],
				'mono': ['IBM Plex Mono', 'Monaco', 'monospace'],
				// Legacy aliases
				'heading': ['Space Grotesk', 'system-ui', 'sans-serif'],
				'body': ['Inter', 'system-ui', 'sans-serif'],
				'code': ['IBM Plex Mono', 'Monaco', 'monospace']
			},
			fontSize: {
				// Brand Scale
				'hero': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
				'h1': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
				'h2': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
				'h3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
				'body-lg': ['1.125rem', { lineHeight: '1.6' }],
				'body': ['1rem', { lineHeight: '1.6' }],
				'caption': ['0.875rem', { lineHeight: '1.5' }],
				'micro': ['0.75rem', { lineHeight: '1.4' }],
				// Standard scale
				'xs': ['0.75rem', { lineHeight: '1rem' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem' }],
				'base': ['1rem', { lineHeight: '1.5rem' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
				'5xl': ['3rem', { lineHeight: '1.1' }],
				'6xl': ['3.75rem', { lineHeight: '1.1' }],
				'7xl': ['4.5rem', { lineHeight: '1' }],
				'8xl': ['6rem', { lineHeight: '1' }],
				'9xl': ['8rem', { lineHeight: '1' }]
			},
			borderRadius: {
				// BRUTALISTA = 0
				'none': '0',
				'sm': '0',
				'DEFAULT': '0',
				'md': '0',
				'lg': '0',
				'xl': '0',
				'2xl': '0',
				'3xl': '0',
				'full': '9999px' // Exceção para avatares
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(16px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(24px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.96)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'grain': {
					'0%, 100%': { transform: 'translate(0, 0)' },
					'10%': { transform: 'translate(-2%, -2%)' },
					'30%': { transform: 'translate(1%, -3%)' },
					'50%': { transform: 'translate(-3%, 2%)' },
					'70%': { transform: 'translate(2%, 1%)' },
					'90%': { transform: 'translate(-1%, 2%)' }
				},
				'blink': {
					'0%, 50%, 100%': { opacity: '1' },
					'25%, 75%': { opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s cubic-bezier(0.2, 0.6, 0.3, 1)',
				'slide-up': 'slide-up 0.8s cubic-bezier(0.2, 0.6, 0.3, 1)',
				'scale-in': 'scale-in 0.5s cubic-bezier(0.2, 0.6, 0.3, 1)',
				'grain': 'grain 6s steps(4) infinite',
				'blink': 'blink 1s steps(1) infinite'
			},
			backgroundImage: {
				// Noise texture for film grain
				'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"
			},
			boxShadow: {
				// Brutalista = shadows hard ou none
				'none': 'none',
				'hard': '4px 4px 0 0 #000000',
				'hard-olive': '4px 4px 0 0 #8dc75e',
				'hard-sm': '2px 2px 0 0 #000000',
				'hard-lg': '8px 8px 0 0 #000000',
				// Subtle for cards
				'subtle': '0 1px 3px rgba(0,0,0,0.12)',
				'elevated': '0 4px 12px rgba(0,0,0,0.15)'
			},
			spacing: {
				'18': '4.5rem',
				'22': '5.5rem',
				'30': '7.5rem'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
