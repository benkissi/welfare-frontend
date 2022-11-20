import axios from "axios";

import { METRICS } from "./endpoints";

export const getMetricsApi = async (companyId, filter) => {
  try {
    let url = `${METRICS}/${companyId}?${filter}`;
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
