/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#2563EB',
        'brand-secondary': '#06B6D4',
        'brand-accent': '#0EA5E9',
      }
    },
  },
  plugins: [],
}
