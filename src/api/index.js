import { makeRequest } from "../config/api.config";

const loginWithEmailAndPassword = async (data) => {
  return await makeRequest.post("/login", data);
};

export { loginWithEmailAndPassword };
