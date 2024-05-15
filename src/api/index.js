import { makeRequest } from "../config/api.config";

const loginWithEmailAndPassword = async (data) => {
  return await makeRequest.post("/login", data);
};

const registerWithEmailAndPassword = async (data) => {
  return await makeRequest.post("/register", data);
};

const getCurrentUser = async () => {
  return await makeRequest.get("/user");
};

const getUsersSuggetions = async (page = 1, limit) => {
  return await makeRequest.get(`/users?page=${page}&limit=${limit}`);
};

// chat apis
const getConversations = async (searchTerm) => {
  let url = "/chats";
  if (searchTerm) {
    url = url + `?search=${searchTerm}`;
  }
  return await makeRequest.get(url);
};

const deleteConversation = async (chatId) => {
  return await makeRequest.delete(`/chat/${chatId}`);
};

const deleteMessages = async (chatId) => {
  return await makeRequest.delete(`/messages/${chatId}`);
};

const markMessageAsSeen = async (messageId) => {
  return await makeRequest.put(`/message/seen/${messageId}`);
};

// comments apis

const getCommentsByPostId = async (postId,pcId=null) => {
  let url = `/comments/${postId}`
  if(pcId){
   url = url + `?parrentCommentId=${pcId}`
  }
  return await makeRequest(url);
};

// post apis

const getPostById = async (postId) => {
  return await makeRequest.get(`post/${postId}`);
};

const uploadPosts = async (data) => {
  return await makeRequest.postForm("/post", data);
};

export {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  getCurrentUser,
  getConversations,
  deleteConversation,
  deleteMessages,
  markMessageAsSeen,
  getCommentsByPostId,
  getPostById,
  getUsersSuggetions,
  uploadPosts
};
