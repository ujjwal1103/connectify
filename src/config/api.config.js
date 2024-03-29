import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "./constant";
import { getCurrentUserAndAccessToken } from "../utils/getCurrentUserId";

const handleUnauthorizedAccess = () => {
  toast.error("Unauthorized Access");
  localStorage.clear();
  window.location.href = "/unauthorized";
};

const makeRequest = axios.create({
  baseURL: BASE_URL,
});

makeRequest.interceptors.request.use(
  (config) => {
    const { user, accessToken } = getCurrentUserAndAccessToken();

    if (user && accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

makeRequest.interceptors.response.use(
  (res) => {
    return res.data;
  },

  (error) => {
    if (error?.response?.status === 401) {
      handleUnauthorizedAccess();
    }
    const myerror = {
      ...error?.response?.data,
      message:
        error.response?.data?.error?.message ||
        error?.message ||
        "something went wrong",
    };
    return Promise.reject(myerror);
  }
);

export { makeRequest };





