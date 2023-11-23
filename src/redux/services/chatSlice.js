import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: null,
  selectedChat: null,
  error: null,
  loading: true,
  messages: [],
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
    addChat: (state, action) => {
      state.chats = [...state.chats, action.payload];
      state.selectedChat = action.payload;
    },
  },
});

export const { setChats, setSelectedChat, setMessages, addChat } =
  chatSlice.actions;

export default chatSlice.reducer;
