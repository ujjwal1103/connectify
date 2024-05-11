import { createSlice } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  user: {},
  otherUser: {},
  followers: [],
  followings: [],
  loading: true,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
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
} = profileSlice.actions;

export const profileState = (state) => state.profile;

const useProfileSlice = () => {
  const dispatch = useDispatch();
  const profile = useSelector(profileState);
  const actions = profileSlice.actions;

  const setUser = useCallback(
    (user) => {
      dispatch(actions.setUser(user));
    },
    [dispatch]
  );

  const setOtherUser = useCallback(
    (user) => {
      dispatch(actions.setOtherUser(user));
    },
    [dispatch]
  );

  const setError = useCallback(
    (error) => {
      dispatch(actions.setError(error));
    },
    [dispatch]
  );

  const setFollowing = useCallback(
    (followings) => {
      dispatch(actions.setFollowing(followings));
    },
    [dispatch]
  );

  return { ...profile, setUser, setOtherUser, setError, setFollowing };
};

export { useProfileSlice };

export default profileSlice.reducer;
