import { defineStore } from "pinia";

export const useTrailsStore = defineStore("trails", {
  state: () => ({
    trails: [
      { id: 1, name: "Bucegi - Jepii Mici", difficulty: "hard", lengthKm: 12, region: "Bucegi" },
      { id: 2, name: "Piatra Craiului - Zărnești", difficulty: "medium", lengthKm: 9, region: "Craiului" },
      { id: 3, name: "Făgăraș - Bâlea Lac", difficulty: "easy", lengthKm: 6, region: "Făgăraș" },
    ],
    search: localStorage.getItem("trails_search") || "",
    selectedDifficulty: "all", // all|easy|medium|hard
    selectedRegion: "all",
    loading: false,
    error: null,
  }),

  getters: {
    // G1
    totalTrails: (s) => s.trails.length,

    // G2
    hasFilters: (s) =>
      s.search.trim() !== "" || s.selectedDifficulty !== "all" || s.selectedRegion !== "all",

    // G3
    filteredTrails: (s) => {
      const q = s.search.toLowerCase().trim();
      return s.trails.filter((t) => {
        const bySearch = q === "" || t.name.toLowerCase().includes(q);
        const byDiff = s.selectedDifficulty === "all" || t.difficulty === s.selectedDifficulty;
        const byReg = s.selectedRegion === "all" || t.region === s.selectedRegion;
        return bySearch && byDiff && byReg;
      });
    },

    // G4
    filteredCount() {
      return this.filteredTrails.length;
    },

    // G5
    regions: (s) => ["all", ...Array.from(new Set(s.trails.map((t) => t.region)))],

    // G6
    getById: (s) => (id) => s.trails.find((t) => t.id === Number(id)) || null,
  },

  actions: {
    // A1
    setSearch(v) {
      this.search = v;
      localStorage.setItem("trails_search", v);
    },

    // A2
    setDifficulty(v) {
      this.selectedDifficulty = v;
    },

    // A3
    setRegion(v) {
      this.selectedRegion = v;
    },

    // A4
    clearFilters() {
      this.search = "";
      this.selectedDifficulty = "all";
      this.selectedRegion = "all";
      localStorage.setItem("trails_search", "");
    },

    // A5
    addTrail(trail) {
      this.trails.push(trail);
    },

    // A6 (demo async)
    async fetchTrailsFake() {
      this.loading = true;
      this.error = null;
      try {
        await new Promise((r) => setTimeout(r, 250));
      } catch {
        this.error = "Failed to load trails";
      } finally {
        this.loading = false;
      }
    },
  },
});
