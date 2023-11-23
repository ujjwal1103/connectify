import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_BASE_URL
    : "http://localhost:3100/api";
// Create the axios instance without the Authorization header initially
const makeRequest = axios.create({
  baseURL: baseURL,
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

export { makeRequest };
