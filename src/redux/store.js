import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./services/authSlice";
import postReducer from "./services/postSlice";
import feedReducer from "./services/feedSlice";
import notificationsReducer from "./services/notificationSlice";
import suggetionsReducer from "./services/suggetionSlice";
import chatReducer from "./services/chatSlice";
import storyReducer from "./services/storySlice";
import profileReducer from "./services/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    feed: feedReducer,
    notifications: notificationsReducer,
    suggetions: suggetionsReducer,
    chat: chatReducer,
    story: storyReducer,
    profile: profileReducer,
  },
});
