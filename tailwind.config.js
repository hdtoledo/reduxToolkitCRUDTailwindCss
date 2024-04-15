/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary-hd': '#111827',
        'bg-card-hd': '#1D2432',
      },
    },
  },
  plugins: [],
}