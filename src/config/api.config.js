import axios from "axios";

const baseURL = process.env.REACT_APP_DEV_BASE_URL;
// process.env.NODE_ENV !== "production"
//   ?
//   : "http://localhost:3100/api";
// Create the axios instance without the Authorization header initially
const makeRequest = axios.create({
  baseURL: baseURL,
  timeoutErrorMessage: "timeout error",
});

// Add an axios request interceptor to set the Authorization header before sending requests
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
  (config) => {
    return config.data;
  },
  (error) => {
    console.log(error?.response?.statusText);
    if (
      error?.response?.statusText === "Unauthorized" ||
      error?.response?.status === 401
    ) {
      window.location.href = "http://localhost:3000/unauthorized";
    }
    return Promise.reject(error.response);
  }
);

export { makeRequest };
