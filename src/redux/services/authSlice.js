import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    addPostToUser: (state, action) => {
      state.user.posts.push(action.payload);
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, addPostToUser, setUser } = authSlice.actions;

export default authSlice.reducer;

export const state = (state) => state.auth;
