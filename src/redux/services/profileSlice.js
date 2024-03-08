import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  otherUser: {},
  followers: [],
  followings: [],
  loading: true,
  error: null,
};

const profilleSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.error = null;
      state.user = action.payload;
      state.loading = false;
    },
    setOtherUser: (state, action) => {
      state.error = null;
      state.otherUser = action.payload;
      state.loading = false;
    },
    setFollower: (state, action) => {
      state.error = null;
      state.followers = action.payload;
      state.loading = false;
    },
    setFollowing: (state, action) => {
      state.error = null;
      state.followings = action.payload;
      state.loading = false;
    },
    removeFollower: (state, action) => {
      state.error = null;
      const userId = action.payload;
      state.followers = state.followers.filter(
        (follower) => follower._id !== userId
      );
      state.user.followers = state.user.followers - 1;
      state.loading = false;
    },
    removeFollowing: (state, action) => {
      state.error = null;
      const userId = action.payload;
      state.user.followings = state.followings.filter(
        (following) => following._id !== userId
      );
      state.user.following = state.user.following - 1;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    reset: () => initialState,
  },
});

export const {
  setFollower,
  setFollowing,
  setOtherUser,
  setUser,
  removeFollower,
  removeFollowing,
  setError,
  setLoading,
  reset,
} = profilleSlice.actions;

export default profilleSlice.reducer;

export const profileState = (state) => state.profile;
