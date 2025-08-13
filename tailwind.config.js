module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
        },
        green: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
        red: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        },
        yellow: {
          50: '#fefce8',
          500: '#eab308',
          600: '#ca8a04',
        },
        purple: {
          500: '#a855f7',
          600: '#9333ea',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          600: '#4b5563',
          900: '#111827',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}