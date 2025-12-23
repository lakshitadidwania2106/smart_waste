/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e9f9f4',
          100: '#c8efe0',
          200: '#a2e6cb',
          300: '#73d7b2',
          400: '#43c89a',
          500: '#21b580',
          600: '#17966b',
          700: '#167757',
          800: '#145d46',
          900: '#0f4838',
        },
        ocean: {
          50: '#e8f4ff',
          100: '#cde4ff',
          200: '#9fcaff',
          300: '#6facff',
          400: '#3d8dff',
          500: '#176fec',
          600: '#0c55c8',
          700: '#0b45a2',
          800: '#0b3a83',
          900: '#0b326e',
        },
      },
      boxShadow: {
        soft: '0 10px 40px rgba(15, 72, 56, 0.08)',
      },
    },
  },
  plugins: [],
}

