import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  selectedChat: null,
  error: null,
  loading: true,
  messages: []
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
      state.error = "";
      state.loading = false;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setChats, setSelectedChat, setMessages } = chatSlice.actions;

export default chatSlice.reducer;
