import { makeRequest } from "../config/api.config";

const loginWithEmailAndPassword = async (data) => {
  return await makeRequest.post("/login", data);
};

const registerWithEmailAndPassword = async (data) => {
  return await makeRequest.post("/register", data);
};

export { loginWithEmailAndPassword };
