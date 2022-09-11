import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const setupAxiosInterceptors = () => {
  const authStore = useAuthStore();

  axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;

  axios.interceptors.request.use((config) => {
    const headers = {};
    headers["Content-Type"] = "application/json";
    if (authStore.userToken) {
      headers.Authorization = authStore.userToken;
    }
    const updatedConfig = { ...config, headers };
    return updatedConfig;
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const {
        status,
        data: { detail },
      } = error.response;
      if (status === 422 && detail === "expired token") {
        authStore.logout();
      } else {
        throw error;
      }
      throw error;
    }
  );
};

export default setupAxiosInterceptors;
