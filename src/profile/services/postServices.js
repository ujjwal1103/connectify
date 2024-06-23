import { makeRequest } from "../../config/api.config";
import {toast} from 'react-toastify'
export const deleteThisPost = async (postId) => {
  try {
    const res = await makeRequest.delete(`post/${postId}`);
    return res.isSuccess;
  } catch (err) {
    toast.error(err.message || "Something went wrong")
    return false;
  }
};

export const followUser = async (userId) => {
  try {
    const res = await makeRequest.post(`/follow/${userId}`);
    return res;
  } catch (err) {
    toast.error(err.message || "Something went wrong")
    return err;
  }
};
export const sentFriendRequest = async (userId) => {
  try {
    const res = await makeRequest.post(`/followRequest/${userId}`);
    return res;
  } catch (err) {
    toast.error(err.message || "Something went wrong")
    return err;
  }
};

export const cancelFollowRequest = async (userId) => {
  try {
    const res = await makeRequest.delete(`/cancelFollow/${userId}`);
    return res;
  } catch (err) {
    toast.error(err.message || "Something went wrong")
    return err;
  }
};

export const unfollowUser = async (userId) => {
  try {
    const res = await makeRequest.delete(`/unfollow/${userId}`);
    return res;
  } catch (err) {
    toast.error(err.message || "Something went wrong")
    return err;
  }
};
