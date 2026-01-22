import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    firstName: localStorage.getItem("firstName") || "Dani",
    lastName: localStorage.getItem("lastName") || "Lunganu",
    loggedIn: localStorage.getItem("loggedIn") === "true",
    level: localStorage.getItem("level") || "beginner", // beginner|intermediate|pro
  }),

  getters: {
    // G10
    fullName: (s) => `${s.firstName} ${s.lastName}`,

    // G11
    greeting() {
      return this.loggedIn ? `Hello, ${this.fullName}!` : "Hello, guest!";
    },

    // G12
    isPro: (s) => s.level === "pro",
  },

  actions: {
    // A11
    setName(first, last) {
      this.firstName = first;
      this.lastName = last;
      localStorage.setItem("firstName", first);
      localStorage.setItem("lastName", last);
    },

    // A12
    login() {
      this.loggedIn = true;
      localStorage.setItem("loggedIn", "true");
    },

    // A13
    logout() {
      this.loggedIn = false;
      localStorage.setItem("loggedIn", "false");
    },
  },
});
