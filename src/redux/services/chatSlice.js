import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  selectedChat: null,
  error: null,
  loading: true,
  messages: [],
  messageChatId: "",
  selectedMessages: [],
  isSelectMessages : false,
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
      state.messages = [];
      state.selectedChat = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addChat: (state, action) => {
      const chatIndex = state.chats.findIndex(
        (chat) => chat._id === action.payload._id
      );
      if (chatIndex === -1) {
        state.chats = [action.payload, ...state.chats];
      }
      state.selectedChat = action.payload;
    },
    setMessageChatId: (state, action) => {
      state.messageChatId = action.payload;
    },
    setSelectedMessage: (state, action) => {
      if (state.selectedMessages.some((m) => m === action.payload)) {
        state.selectedMessages = state.selectedMessages.filter(
          (id) => id !== action.payload
        );
      } else {
        state.selectedMessages.push(action.payload);
      }
    },
    resetSelectedMessages: (state, action)=>{
      state.selectedMessages = []
    },
    setIsSelectMessages : (state, action) =>{
      state.isSelectMessages = action.payload;
    },
    removeChat: (state, action) =>{
      state.chats = state.chats.filter((chat)=>chat._id !== action.payload)
    },
    reorderChat: (state, action) => {
      const chatId = action.payload;
      // Find the index of the chat with the specified chatId
      const chatIndex = state.chats.findIndex(chat => chat._id === chatId);
      if (chatIndex > 0) {
        // Remove the chat from its current position
        const [chat] = state.chats.splice(chatIndex, 1);
        // Add the chat to the beginning of the array
        state.chats.unshift(chat);
      }
      // If chatIndex is 0 or chatId not found, do nothing
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
  reset,
  setSelectedMessage,
  setIsSelectMessages,
  resetSelectedMessages,
  removeChat,reorderChat
} = chatSlice.actions;

export default chatSlice.reducer;
