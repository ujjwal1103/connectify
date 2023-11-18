import axios from "axios";
console.log(process.env.REACT_APP_DEV_BASE_URL);
// Create the axios instance without the Authorization header initially
const makeRequest = axios.create({
  baseURL: process.env.REACT_APP_DEV_BASE_URL,
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
