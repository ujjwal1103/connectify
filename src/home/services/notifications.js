import { makeRequest } from "../../config/api.config";

export const sendNotification = async (notification) => {
  try {
    const res = await makeRequest.post("notifications", notification);
    return res;
  } catch (error) {
    return error;
  }
};
