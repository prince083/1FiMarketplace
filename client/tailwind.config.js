/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f0ff',
          100: '#eae4ff',
          200: '#d7ccfe',
          300: '#baa4fd',
          400: '#9b71fb',
          500: '#7e3ff7',
          600: '#6c22ee',
          700: '#5c17d7',
          800: '#4c14b2',
          900: '#3f1390',
          950: '#23075c',
        },
        onefi: {
          purple: '#6C38FF',
          darkBg: '#1a064b',
          lightBg: '#F8F9FE',
          cardBorder: '#ECEEF6',
          textMuted: '#6B7280',
          textHeading: '#111827'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'nav': '0 -4px 20px rgba(0, 0, 0, 0.05)',
        'pill': '0 2px 8px rgba(108, 56, 255, 0.15)'
      }
    },
  },
  plugins: [],
}
