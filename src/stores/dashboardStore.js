import { defineStore } from "pinia";

import { getMetricsApi } from "../api/index";

export const useDashboardStore = defineStore({
  id: "dashboard",
  state: () => ({
    metrics: null,
    fetchingMetrics: false,
  }),
  getters: {},
  actions: {
    async getMetrics(companyId, filter) {
      this.fetchingMetrics = true;
      const res = await getMetricsApi(companyId, filter);
      if (res.success) {
        this.metrics = res.data;
      }
      this.fetchingMetrics = false;
    },
  },
});
