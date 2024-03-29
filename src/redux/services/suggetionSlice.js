import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  suggestedusers: [],
  loading: true,
};

const suggetionSlice = createSlice({
  name: "suggestion",
  initialState,
  reducers: {
    setSuggetions: (state, action) => {
      state.loading = false;
      state.suggestedusers = action.payload;
    },
    followUser: (state, action) => {
      const userId = action.payload;
      const user = state.suggestedusers.find((u) => u._id === userId);
      if (user) {
        user.isFollowed = true;
      }
    },
    reset: () => initialState,
  },
});

export const { setSuggetions, followUser, reset } = suggetionSlice.actions;

export default suggetionSlice.reducer;
