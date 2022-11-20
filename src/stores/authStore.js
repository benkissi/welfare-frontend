import { defineStore } from "pinia";
import {
  login,
  signUp,
  sendCompanyDetails,
  getUserCompanyApi,
} from "../api/index";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    profile: null,
    user: null,
    userToken: "",
    loading: false,
    companyInfo: null,
    fetchingCompany: false,
  }),
  getters: {
    token: (state) => state.profile?.token,
  },
  actions: {
    async logout() {
      this.userToken = "";
      this.user = null;
    },

    async loginUser(email = "", password = "") {
      this.loading = true;
      const res = await login(email, password);
      if (res.success) {
        this.user = res.data.user;
        this.userToken = res.data.accessToken;
      }
      this.loading = false;
    },

    async signUpUser(details) {
      this.loading = true;
      const res = await signUp(details);
      if (res.success) {
        this.user = res.data;
      }
      this.fetchUserCompany();
      this.loading = false;
    },
    async fetchUserCompany(userId) {
      this.fetchingCompany = true;
      const res = await getUserCompanyApi(userId);
      if (res.success) {
        this.companyInfo = res.data.data;
      }
      this.fetchingCompany = false;
    },
    async addCompanyInfo(details) {
      this.loading = true;
      const res = await sendCompanyDetails(details);
      if (res.success) {
        this.companyInfo = res.data;
      }
      this.loading = false;
    },
  },
  persist: {
    paths: ["user", "userToken", "companyInfo"],
  },
});
