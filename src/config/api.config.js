import axios from "axios";
import { createBrowserHistory } from "history";
import { toast } from "react-toastify";

const history = createBrowserHistory();

let baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_DEV_BASE_URL
    : "http://localhost:3200/api";

const makeRequest = axios.create({
  baseURL: baseURL,
});

makeRequest.interceptors.request.use(
  (config) => {
    // Check if user data with a token exists in localStorage
    const userData = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    if (userData && userData.token) {
      config.headers.Authorization = userData.token;
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
      toast.error("Unauthorized Access");
      history.push("/unauthorized");
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
