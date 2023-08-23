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
        primaryDark: '#26292B',
        secondaryDark: '#2E3239',
        thirdDark: '#5F7ADB',
        fourthDark: '#A2B2EE',
        fifthDark: '#1a1a1a'
      }
    }
  },
  plugins: [],
}

