import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
  state: () => ({
    theme: localStorage.getItem("theme") || "light",
    toast: "",
    toastVisible: false,
  }),

  getters: {
    // G15
    isDark: (s) => s.theme === "dark",

    // G16
    toastText: (s) => s.toast,
  },

  actions: {
    // A16
    setTheme(theme) {
      this.theme = theme;
      localStorage.setItem("theme", theme);
    },

    // A17
    showToast(message, ms = 1500) {
      this.toast = message;
      this.toastVisible = true;
      setTimeout(() => {
        this.toastVisible = false;
      }, ms);
    },
  },
});
