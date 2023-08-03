/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        stoke: ['Stoke', 'sans-serif'],
        arvo: ['Arvo', 'sans-serif'],
        slabo: ['Slabo', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
