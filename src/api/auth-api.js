import axios from "axios";

import { LOGIN, SIGNUP, COMPANIES } from "./endpoints";

export const login = async (email = "", password = "") => {
  try {
    const payload = {
      email,
      password,
      strategy: "local",
    };
    const res = await axios.post(LOGIN, payload);

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

export const signUp = async (details) => {
  try {
    const res = await axios.post(SIGNUP, details);

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

export const sendCompanyDetails = async (details) => {
  try {
    console.log("post=---", details);
    const res = await axios.post(COMPANIES, details);

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

export const getUserCompanyApi = async (userId) => {
  try {
    const url = `${COMPANIES}?$or[0][owner]=${userId}&$or[1][operators.userId]=${userId}`;
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
