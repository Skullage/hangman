/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#171717',
        lightdark: '#06090E',
        primary: '#fff'
      }
    }
  },
  plugins: [],
}

