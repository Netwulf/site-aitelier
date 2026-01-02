
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
				// Elegant Green System - Futuro Ancestral
				green: {
					50: 'hsl(142, 76%, 96%)',
					100: 'hsl(142, 76%, 90%)',
					200: 'hsl(142, 76%, 80%)',
					300: 'hsl(142, 76%, 65%)',
					400: 'hsl(142, 76%, 50%)',
					500: 'hsl(142, 76%, 36%)', // Primary Elegant Green
					600: 'hsl(142, 76%, 30%)',
					700: 'hsl(142, 76%, 25%)',
					800: 'hsl(142, 76%, 20%)',
					900: 'hsl(142, 76%, 15%)'
				},
				emerald: {
					50: 'hsl(152, 81%, 96%)',
					100: 'hsl(149, 80%, 90%)',
					200: 'hsl(152, 76%, 80%)',
					300: 'hsl(156, 72%, 67%)',
					400: 'hsl(158, 64%, 52%)',
					500: 'hsl(160, 84%, 39%)',
					600: 'hsl(161, 94%, 30%)',
					700: 'hsl(163, 94%, 24%)',
					800: 'hsl(163, 88%, 20%)',
					900: 'hsl(164, 86%, 16%)'
				},
				teal: {
					50: 'hsl(166, 76%, 97%)',
					100: 'hsl(167, 85%, 89%)',
					200: 'hsl(168, 84%, 78%)',
					300: 'hsl(171, 77%, 64%)',
					400: 'hsl(172, 66%, 50%)',
					500: 'hsl(173, 80%, 40%)',
					600: 'hsl(175, 84%, 32%)',
					700: 'hsl(175, 77%, 26%)',
					800: 'hsl(176, 69%, 22%)',
					900: 'hsl(176, 61%, 19%)'
				},
				black: {
					50: '#F8F9FA',
					100: '#E9ECEF',
					200: '#DEE2E6',
					300: '#CED4DA',
					400: '#6C757D',
					500: '#495057',
					600: '#343A40',
					700: '#212529',
					800: '#1A1D20',
					900: '#0F1113',
					950: '#0A0C0E' // Deep Black
				},
				cream: {
					50: '#FEFCF9',
					100: '#FDF8F1',
					200: '#FBF0E4',
					300: '#F8E6D3',
					400: '#F4D8BE',
					500: '#EFC49E' // Cream accent
				}
			},
			fontFamily: {
				'display': ['SF Pro Display', 'system-ui', 'sans-serif'],
				'sans': ['Inter', 'system-ui', 'sans-serif'],
				'mono': ['SF Mono', 'Monaco', 'Cascadia Code', 'monospace']
			},
			fontSize: {
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
				'7xl': ['4.5rem', { lineHeight: '1.1' }],
				'8xl': ['6rem', { lineHeight: '1.1' }],
				'9xl': ['8rem', { lineHeight: '1.1' }]
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-up': {
					'0%': { opacity: '0', transform: 'translateY(40px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'glow-pulse': {
					'0%, 100%': { boxShadow: '0 0 30px rgba(52, 211, 153, 0.3)' },
					'50%': { boxShadow: '0 0 50px rgba(52, 211, 153, 0.5)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'grain': {
					'0%, 100%': { transform: 'translate(0, 0)' },
					'10%': { transform: 'translate(-5%, -5%)' },
					'30%': { transform: 'translate(3%, -7%)' },
					'50%': { transform: 'translate(-7%, 6%)' },
					'70%': { transform: 'translate(5%, 2%)' },
					'90%': { transform: 'translate(-3%, 5%)' }
				},
				'text-reveal': {
					'0%': { opacity: '0', filter: 'blur(10px)' },
					'100%': { opacity: '1', filter: 'blur(0px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.8s cubic-bezier(0.2, 0.65, 0.3, 0.9)',
				'fade-in-up': 'fade-in-up 1s cubic-bezier(0.2, 0.65, 0.3, 0.9)',
				'scale-in': 'scale-in 0.6s cubic-bezier(0.2, 0.65, 0.3, 0.9)',
				'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'grain': 'grain 8s steps(6) infinite',
				'text-reveal': 'text-reveal 1.2s cubic-bezier(0.2, 0.65, 0.3, 0.9)'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'mesh-gradient': 'radial-gradient(circle at 20% 50%, rgba(52, 211, 153, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.08) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(52, 211, 153, 0.06) 0%, transparent 50%)',
				'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"
			},
			boxShadow: {
				'glow-green': '0 0 30px rgba(52, 211, 153, 0.25)',
				'glow-green-strong': '0 0 50px rgba(52, 211, 153, 0.4)',
				'glass': '0 8px 32px rgba(0, 0, 0, 0.12)',
				'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
			},
			backdropBlur: {
				'xs': '2px'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
