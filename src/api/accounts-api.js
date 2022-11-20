import axios from "axios";

import { MEMBERS, CONTRIBUTIONS, REDRAWALS } from "./endpoints";

export const getAccountDetailsApi = async (id) => {
  try {
    const url = `${MEMBERS}/${id}`;
    const res = await axios.get(url);

    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    console.log("error -- getAccountDetailsApi -->", error);
    return {
      success: false,
      data: error,
    };
  }
};

export const getContributionsApi = async (
  id,
  skip = 0,
  limit = 10,
  filter = ""
) => {
  try {
    let url = `${CONTRIBUTIONS}?member=${id}&skip=${skip}&limit=${limit}`;
    if (filter) url = url + `&${filter}`;
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

export const getRedrawalsApi = async (
  id,
  skip = 0,
  limit = 10,
  filter = ""
) => {
  try {
    let url = `${REDRAWALS}?member=${id}&skip=${skip}&limit=${limit}`;
    if (filter) url = url + `&${filter}`;
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

export const addContributionApi = async (payload) => {
  try {
    const url = CONTRIBUTIONS;
    const res = await axios.post(url, payload);
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

export const addRedrawalApi = async (payload) => {
  try {
    const url = REDRAWALS;
    const res = await axios.post(url, payload);
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

export const changeStatusApi = async (status, id) => {
  try {
    if (status === undefined) return;
    const url = `${MEMBERS}/${id}`;
    const res = await axios.patch(url, { active: status });
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
