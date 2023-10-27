import axios from "axios";

// Create the axios instance without the Authorization header initially
const makeRequest = axios.create({
  baseURL: "http://localhost:3100/api",
});

// Add an axios request interceptor to set the Authorization header before sending requests
makeRequest.interceptors.request.use(
  (config) => {
    // Check if user data with a token exists in localStorage
    const userData = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

    if (userData && userData.token) {
      // If a valid token exists, set the Authorization header
      config.headers.Authorization = userData.token;
    }

    return config;
  },
  (error) => {
    // Handle request errors (e.g., network issues)
    return Promise.reject(error);
  }
);

export { makeRequest };
