import { defineStore } from "pinia";
import { addMemberApi, getMembersApi } from "../api/index";

export const useMemberStore = defineStore({
  id: "member",
  state: () => ({
    members: [],
    member: null,
    pagingInfo: {
      total: 1,
      limit: 10,
      skip: 0,
    },
    addingMember: false,
    fetchingMembers: false,
  }),
  getters: {},
  actions: {
    async addMemberDetails(details) {
      this.addingMember = true;
      const res = await addMemberApi(details);
      this.addingMember = false;
      if (res.success) {
        this.member = res.data;
        return true;
      }
      return false;
    },

    async getMembers(search = "", skip = 0, limit = 10) {
      this.fetchingMembers = true;
      const res = await getMembersApi(search, skip, limit);
      this.fetchingMembers = false;
      if (res.success) {
        this.members = res.data.data;
        this.pagingInfo = {
          total: res.data.total,
          limit: res.data.limit,
          skip: res.data.skip,
        };
        return true;
      }

      return false;
    },
  },
});
