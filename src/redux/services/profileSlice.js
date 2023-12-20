import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  otherUser: {},
  followers: {},
  followings: {},
};

const profilleSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setOtherUser: (state, action) => {
      state.user = action.payload;
    },
    setFollower: (state, action) => {
      state.followers = action.payload;
    },
    setFollowing: (state, action) => {
      state.followings = action.payload;
    },
    removeFollower: (state, action) => {
      const userId = action.payload;
      state.followers = state.followers.filter(
        (follower) => follower._id !== userId
      );
      state.user.followers = state.user.followers - 1;
    },
    removeFollowing: (state, action) => {
      const userId = action.payload;
      state.user.followings = state.followings.filter(
        (following) => following._id !== userId
      );
      state.user.following = state.user.following - 1;
    },
  },
});

export const {
  setFollower,
  setFollowing,
  setOtherUser,
  setUser,
  removeFollower,
  removeFollowing,
} = profilleSlice.actions;

export default profilleSlice.reducer;

export const profileState = (state) => state.profile;
