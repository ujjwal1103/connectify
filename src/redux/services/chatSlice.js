import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  selectedChat: null,
  error: null,
  loading: true,
  messages: [],
  messageChatId: "",
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
      state.messages= []
      state.selectedChat = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addChat: (state, action) => {
      state.chats = [...state.chats, action.payload];
      state.selectedChat = action.payload;
    },
    setMessageChatId: (state, action) => {
      state.messageChatId = action.payload;
    },
    reset: () => initialState,
  },
});

export const {
  setChats,
  setSelectedChat,
  setMessages,
  addChat,
  setMessageChatId,
  reset
} = chatSlice.actions;

export default chatSlice.reducer;
