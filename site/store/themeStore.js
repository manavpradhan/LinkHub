import { create } from "zustand";

const themeStore = (set) => ({
  current_theme: "",

  setTheme: (theme) => {
    set(() => ({ current_theme: theme }));
  },

  saveTheme: (theme) => {
    localStorage.setItem("user-theme", theme);
  },
});

const useThemeStore = create(themeStore);

export default useThemeStore;
