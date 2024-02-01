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
    // setPosts: (state, action) => {
    //   state.loading = false;

    //   const newPosts = action.payload.posts?.filter(
    //     (post) => !state.posts.some((p) => p._id === post._id)
    //   );
    //   state.posts = [...state.posts, ...newPosts];
    // },
    setPosts: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
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
    resetState: (state, action) => {
      return initialState;
    },
    resetPosts: (state, action) => {
      state.loading = true;
      state.posts = action.payload;
      state.hasNext = false;
    },
  },
});

export const {
  setPosts,
  addPost,
  setError,
  setPost,
  deletePost,
  resetState,
  likePost,
  unlikePost,
  setPage,
  setLoading,
  resetPosts,
  setHasNext,
} = postSlice.actions;

export default postSlice.reducer;

export const state = (state) => state.auth;
