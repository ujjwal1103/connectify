import { makeRequest } from "../../config/api.config";

export const deleteThisPost = async (postId) => {
  try {
    const res = await makeRequest.delete(`post/${postId}`);
    return res.data.isSuccess;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const sendFriendRequest = async (userId) => {
  try {
     const res = await makeRequest.put(`/sendFriendReq`,{ friendId: userId });
    return res.data;
  } catch (err) {
    console.log(err);
    return err;
  }
}