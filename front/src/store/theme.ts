import Module from 'vuex';
import { ThemeState } from '@/types/theme';

const theme: Module<ThemeState, any> = {
  namespaced: true,
  state: (): ThemeState => ({
    themeMode: 'dark',
  }),
  getters: {
    isDarkTheme(state): boolean {
      return (
        localStorage.theme === 'dark' ||
        state.themeMode === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    },
  },
  mutations: {
    toggleTheme(state, mode: ThemeState) {
      state.themeMode = mode;
      localStorage.setItem('theme', mode);
      if (mode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },
};

export default theme;
