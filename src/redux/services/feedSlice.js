import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feed: {
    
  },
  feeds: [],
  loading: true,
  error: null,
  totalPages: 0,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeeds: (state, action) => {
      state.loading = false;
      const newPosts = action.payload.posts.filter(
        (post) => !state.feeds.some((feed) => feed._id === post._id)
      );
      state.feeds = [...state.feeds, ...newPosts];
      state.totalPages = action.payload.totalPages;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFeed: (state, action) => {
      state.feed = action.payload;
    },
    likePost: (state, action) => {
      const postId = action.payload.postId;

      const likedPostIndex = state.feeds.findIndex(
        (post) => post._id === postId
      );
      if (likedPostIndex !== -1) {
        state.feeds[likedPostIndex].like += 1;
        state.feeds[likedPostIndex].isLiked = true;
        if (Object.entries(state.feed).length !== 0) {
          state.feed.like += 1;
          state.feed.isLiked = true;
        }
      }
    },
    unlikePost: (state, action) => {
      const { postId, userId } = action.payload;
      const unlikedPostIndex = state.feeds.findIndex(
        (post) => post._id === postId
      );
      if (unlikedPostIndex !== -1) {
        state.feeds[unlikedPostIndex].like -= 1;

        state.feeds[unlikedPostIndex].isLiked = false;
        if (Object.entries(state.feed).length !== 0) {
          state.feed.like -= 1;
          state.feed.isLiked = false;
        }
      }
    },
    resetFeedState: (state) => {
      state.feeds = [];
      state.feed = {};
      state.loading = true;
      state.error = null;
    },
  },
});

export const {
  setFeeds,
  setError,
  likePost,
  unlikePost,
  resetFeedState,
  setFeed,
} = feedSlice.actions;

export default feedSlice.reducer;

export const state = (state) => state.auth;
