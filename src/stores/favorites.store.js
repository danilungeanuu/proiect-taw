import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    ids: JSON.parse(localStorage.getItem("favorite_ids") || "[]"),
  }),

  getters: {
    // G7
    totalFavorites: (s) => s.ids.length,

    // G8
    hasFavorites: (s) => s.ids.length > 0,

    // G9
    isFavorite: (s) => (id) => s.ids.includes(Number(id)),
  },

  actions: {
    // A7
    persist() {
      localStorage.setItem("favorite_ids", JSON.stringify(this.ids));
    },

    // A8
    add(id) {
      const n = Number(id);
      if (!this.ids.includes(n)) this.ids.push(n);
      this.persist();
    },

    // A9
    remove(id) {
      const n = Number(id);
      this.ids = this.ids.filter((x) => x !== n);
      this.persist();
    },

    // A10
    toggle(id) {
      this.isFavorite(id) ? this.remove(id) : this.add(id);
    },
  },
});
