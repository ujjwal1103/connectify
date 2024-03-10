import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: {},
  posts: [],
  loading: true,
  error: null,
  hasNext: false,
  page: 1,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      // Assuming action.payload is an array of new posts
      const newPosts = action.payload;

      // Filter out duplicates based on a unique identifier (e.g., post ID)
      const uniqueNewPosts = newPosts.filter(
        (newPost) =>
          !state.posts.some((existingPost) => existingPost._id === newPost._id)
      );

      // Update the state with unique new posts
      state.posts = [...state.posts, ...uniqueNewPosts];
    },
    addPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
      state.loading = false;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    deletePost: (state, action) => {
      const postId = action.payload;
      state.posts = state.posts.filter((post) => post._id !== postId);
    },
    likePost: (state, action) => {
      const postId = action.payload.postId;
      const userId = action.payload.postId;

      const likedPostIndex = state.posts.findIndex(
        (post) => post._id === postId
      );
      if (likedPostIndex !== -1) {
        state.posts[likedPostIndex].likeCount += 1;
        state.posts[likedPostIndex].likedBy.push(userId);
        state.posts[likedPostIndex].isLiked = true;
        if (Object.entries(state.post).length !== 0) {
          state.post.likeCount += 1;
          state.post.likedBy.push(userId);
          state.post.isLiked = true;
        }
      }
    },
    unlikePost: (state, action) => {
      const { postId, userId } = action.payload;
      const unlikedPostIndex = state.posts.findIndex(
        (post) => post._id === postId
      );
      if (unlikedPostIndex !== -1) {
        state.posts[unlikedPostIndex].likeCount -= 1;
        state.posts[unlikedPostIndex].likedBy.pop(userId);
        state.posts[unlikedPostIndex].isLiked = false;
        if (Object.entries(state.post).length !== 0) {
          state.post.likeCount -= 1;
          state.post.likedBy.pop(userId);
          state.post.isLiked = false;
        }
      }
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setHasNext: (state, action) => {
      state.hasNext = action.payload;
    },
    reset: () => initialState,
  },
});

export const {
  setPosts,
  addPost,
  setError,
  setPost,
  deletePost,
  likePost,
  unlikePost,
  setPage,
  setLoading,
  reset,
  setHasNext,
} = postSlice.actions;

export default postSlice.reducer;

export const state = (state) => state.auth;
