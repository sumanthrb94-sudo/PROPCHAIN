import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#030712',
          950: '#020617',
        },
        'cyber-teal': '#2DD4BF',
        gold: {
          50: '#FEFDF0',
          100: '#FDF9D7',
          200: '#FBF0A0',
          300: '#F7E263',
          400: '#F0CA2A',
          500: '#D4AF37',
          600: '#B8941E',
          700: '#8B6D12',
          800: '#5C470C',
          900: '#2E2306',
        },
        navy: {
          50: '#F0F2F8',
          100: '#D8DDF0',
          200: '#B0BBE1',
          300: '#7A8FCC',
          400: '#4A63B5',
          500: '#2D3D8F',
          600: '#1F2E72',
          700: '#1A1F2E',
          800: '#131720',
          900: '#0A0C12',
        },
      },
      fontFamily: {
        outfit: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 40px rgba(212,175,55,0.2)',
        glow: '0 0 30px rgba(212,175,55,0.4)',
        'glow-sm': '0 0 15px rgba(212,175,55,0.3)',
        'inner-gold': 'inset 0 1px 0 rgba(212,175,55,0.2)',
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out 1s infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212,175,55,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(212,175,55,0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #F0CA2A 50%, #B8941E 100%)',
        'gradient-navy': 'linear-gradient(135deg, #1A1F2E 0%, #0A0C12 100%)',
        'gradient-hero': 'linear-gradient(135deg, #1A1F2E 0%, #1F2E72 50%, #1A1F2E 100%)',
        'gradient-card': 'linear-gradient(135deg, #0891B2 0%, #1A1F2E 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#374151',
            a: { color: '#D4AF37', '&:hover': { color: '#B8941E' } },
            h1: { fontFamily: 'var(--font-cormorant)', color: '#1A1F2E' },
            h2: { fontFamily: 'var(--font-cormorant)', color: '#1A1F2E' },
            h3: { fontFamily: 'var(--font-cormorant)', color: '#1A1F2E' },
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
