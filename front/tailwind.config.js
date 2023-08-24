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
        primaryLight: "#f9f8fd",
        secondaryLight: "#f6f5f3",
        thirdLight: "#3d3d3f",
        fourthLight: "#7dce94",
        fifthLight: "#cdd422",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
