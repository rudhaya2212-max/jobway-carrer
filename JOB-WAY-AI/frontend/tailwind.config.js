/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF9F6', // Warm cream background
        surface: {
          DEFAULT: '#FFFFFF', // Clean white
          hover: '#F5F4F0',
          border: '#E8E7E2',
          muted: '#F0EFEA',
        },
        neutral: {
          50: '#FAF9F6',
          100: '#F3F2ED',
          200: '#E8E7E2',
          300: '#D6D4CC',
          400: '#A3A096',
          500: '#737067',
          600: '#525049',
          700: '#383732',
          800: '#242320',
          900: '#141412',
          950: '#0A0A09',
        },
        accent: {
          blue: '#1D4ED8',
          emerald: '#059669',
          amber: '#D97706',
          rose: '#E11D48',
          purple: '#7C3AED',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'card': '0 2px 6px -1px rgba(0, 0, 0, 0.05), 0 1px 4px -2px rgba(0, 0, 0, 0.04)',
        'dropdown': '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
