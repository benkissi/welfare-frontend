import { defineStore } from "pinia";
import { login, signUp, sendCompanyDetails } from "../api/index";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    profile: null,
    user: null,
    userToken: "",
    loading: false,
    companyInfo: null,
  }),
  getters: {
    token: (state) => state.profile?.token,
  },
  actions: {
    async logout() {
      this.profile = null;
    },

    async loginUser(email = "", password = "") {
      this.loading = true;
      const res = await login(email, password);
      console.log("res---", res);
      if (res.success) {
        this.user = res.data.user;
        this.userToken = res.data.accessToken;
      }
      this.loading = false;
    },

    async signUpUser(details) {
      this.loading = true;
      const res = await signUp(details);
      console.log("res---", res);
      if (res.success) {
        this.user = res.data;
      }
      this.loading = false;
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
    paths: ["user", "userToken"],
  },
});
