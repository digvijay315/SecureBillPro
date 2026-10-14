/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Jost', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        lagoon: {
          50: '#F5EFE6',
          100: '#EBDDC7',
          200: '#DEC097',
          300: '#CDA268',
          400: '#CCA273',
          500: '#BA8551',
          600: '#A67241',
          700: '#2A3430',
          800: '#1D2522',
          900: '#151D1A',
          950: '#0E1412',
        },
        saffron: {
          50: '#FEFBF5',
          100: '#FAF3E5',
          200: '#F3E5C7',
          300: '#E8D2A0',
          400: '#CCA273',
          500: '#BA8551',
          600: '#A67241',
          700: '#8C5B30',
          800: '#6C4320',
          900: '#4E2F16',
        },
        linen: '#FAF8F5',
        gold: {
          50: '#FEFBF5',
          100: '#FAF3E5',
          200: '#F3E5C7',
          300: '#E8D2A0',
          400: '#CCA273',
          500: '#BA8551',
          600: '#A67241',
          700: '#8C5B30',
          800: '#2A3430',
          900: '#151D1A',
          950: '#0E1412',
        }
      }
    },
  },
  plugins: [],
}
