const theme = {
  namespaced: true,
  state: () => ({
    themeMode: "light",
  }),
  getters: {
    isDarkTheme() {
      return (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    },
  },
  mutations: {
    toggleTheme(state, mode) {
      state.themeMode = mode;
      localStorage.setItem("theme", mode);
      if (mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
};

export default theme;
