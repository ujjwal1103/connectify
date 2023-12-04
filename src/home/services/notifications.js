import { makeRequest } from "../../config/api.config";

export const sendNotification = async (notification) => {
  console.log(notification);
  try {
    const res = await makeRequest.post("notifications", notification);
    return res;
  } catch (error) {
    return error;
  }
};
