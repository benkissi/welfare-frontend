import { defineStore } from "pinia";
import {
  getContributionsApi,
  getAccountDetailsApi,
  addContributionApi,
  getRedrawalsApi,
  addRedrawalApi,
  changeStatusApi,
} from "../api/index";

export const useAccountsStore = defineStore({
  id: "accounts",
  state: () => ({
    currentContributions: [],
    contributionsPagingInfo: {
      total: 10,
    },
    redrawalsPagingInfo: {
      total: 10,
    },
    currentRedrawals: [],
    currentAccount: null,
    fetchingContributions: false,
    fetchingAccountDetails: false,
    addingContribution: false,
    fetchingRedrawals: false,
    addingRedrawal: false,
    changingStatus: false,
    error: null,
  }),
  getters: {},
  actions: {
    async fetchAccountDetails(id) {
      this.fetchingAccountDetails = true;
      const res = await getAccountDetailsApi(id);
      if (res.success) {
        this.currentAccount = res.data;
        this.fetchingAccountDetails = false;
        return res;
      } else {
        this.fetchingAccountDetails = false;
        return res;
      }
    },
    async fetchContributions(id, skip = 0, limit = 10, filter = "") {
      this.fetchingContributions = true;
      const res = await getContributionsApi(id, skip, limit, filter);
      this.fetchingContributions = false;
      if (res.success) {
        this.currentContributions = res.data.data;
        this.contributionsPagingInfo = {
          limit: res.data.limit,
          skip: res.data.skip,
          total: res.data.total,
        };
        return res;
      } else {
        return res;
      }
    },

    async fetchRedrawals(id, skip = 0, limit = 10, filter = "") {
      this.fetchingRedrawals = true;
      const res = await getRedrawalsApi(id, skip, limit, filter);
      this.fetchingRedrawals = false;
      if (res.success) {
        this.currentRedrawals = res.data.data;
        this.redrawalsPagingInfo = {
          limit: res.data.limit,
          skip: res.data.skip,
          total: res.data.total,
        };
        return res;
      } else {
        return res;
      }
    },

    async addContribution(payload) {
      this.addingContribution = true;
      const res = await addContributionApi(payload);

      this.addingContribution = false;
      return res;
    },

    async addRedrawal(payload) {
      this.addingRedrawal = true;
      const res = await addRedrawalApi(payload);

      this.addingRedrawal = false;
      return res;
    },

    async changeAccountStatus(status, id) {
      this.changingStatus = true;
      const res = await changeStatusApi(status, id);
      this.changingStatus = false;
      console.log("res---->", res);
      return res;
    },
  },
  //   persist: {
  //     paths: ["user", "userToken", "companyInfo"],
  //   },
});
