import { defineStore } from "pinia";

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    byTrailId: {}, // { [id]: { tempC, condition, updatedAt } }
    loading: false,
    error: null,
  }),

  getters: {
    // G13
    getWeather: (s) => (trailId) => s.byTrailId[Number(trailId)] || null,

    // G14
    hasWeather: (s) => (trailId) => Boolean(s.byTrailId[Number(trailId)]),
  },

  actions: {
    // A14
    clearWeather(trailId) {
      const id = Number(trailId);
      const copy = { ...this.byTrailId };
      delete copy[id];
      this.byTrailId = copy;
    },

    // A15 (demo async)
    async fetchWeatherFake(trailId) {
      const id = Number(trailId);
      this.loading = true;
      this.error = null;
      try {
        await new Promise((r) => setTimeout(r, 250));
        const randomTemp = Math.floor(10 + Math.random() * 15);
        const conditions = ["Sunny", "Cloudy", "Windy", "Rain"];
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        this.byTrailId = {
          ...this.byTrailId,
          [id]: { tempC: randomTemp, condition, updatedAt: Date.now() },
        };
      } catch {
        this.error = "Weather load failed";
      } finally {
        this.loading = false;
      }
    },
  },
});
