import axios from "axios";

import { MEMBERS } from "./endpoints";

export const addMemberApi = async (details) => {
  try {
    const url = MEMBERS;
    const res = await axios.post(url, details);
    console.log("members", res.data);
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};

export const getMembersApi = async (search = "", skip = 0, limit = 10) => {
  try {
    const query = search
      ? `?$search=${search}&skip=${skip}&limit=${limit}`
      : `?skip=${skip}&limit=${limit}`;
    const url = `${MEMBERS}${query}`;
    const res = await axios.get(url);
    console.log("get members", res.data);
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    return {
      success: false,
      data: error,
    };
  }
};
