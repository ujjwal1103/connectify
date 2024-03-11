import { makeRequest } from "../../config/api.config";

export const deleteThisPost = async (postId) => {
  try {
    const res = await makeRequest.delete(`post/${postId}`);
    return res.isSuccess;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const followUser = async (userId) => {
  try {
    const res = await makeRequest.post(`/follow/${userId}`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const sentFriendRequest = async (userId) => {
  try {
    const res = await makeRequest.post(`/followRequest/${userId}`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
export const cancelFollowRequest = async (userId) => {
  try {
    const res = await makeRequest.delete(`/cancelFollow/${userId}`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const unfollowUser = async (userId) => {
  try {
    const res = await makeRequest.delete(`/unfollow/${userId}`);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
