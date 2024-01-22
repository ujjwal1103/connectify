import axios from "axios";
import { toast } from "react-toastify";

const handleUnauthorizedAccess = () => {
  toast.error("Unauthorized Access");
  console.log("Attempting history push to /unauthorized");
  localStorage.clear();
  window.location.href = "/unauthorized";
};

let baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_DEV_BASE_URL
    : "http://localhost:3200/api";

const makeRequest = axios.create({
  baseURL: baseURL,
});

makeRequest.interceptors.request.use(
  (config) => {
    const userData = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    if (userData && userData.accessToken) {
      config.headers.Authorization = userData.accessToken;
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
      ...error.response?.data,
      message:
        error.response?.data.error.message ||
        error.message ||
        "something went wrong",
    };
    return Promise.reject(myerror);
  }
);

export { makeRequest };
