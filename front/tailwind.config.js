/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryDark: "#26292B",
        secondaryDark: "#2E3239",
        thirdDark: "#5F7ADB",
        fourthDark: "#A2B2EE",
        fifthDark: "#1a1a1a",
        primaryLight: "#f9f9f9",
        fourthLight: "#dfdbdc",
        secondaryLight: "#739dab",
        thirdLight: "#bac3ca",
        fifthLight: "#315d6a",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
