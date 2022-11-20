import axios from "axios";

import { CONTRIBUTIONS } from "./endpoints";

export const getContributionsApi = async () => {
  try {
    const url = CONTRIBUTIONS;
    const res = await axios.get(url);
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
