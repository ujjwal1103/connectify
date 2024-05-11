import { createSlice } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { BsChatSquare } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  chats: [],
  selectedChat: null,
  error: null,
  loading: true,
  messages: [],
  messageChatId: "",
  selectedMessages: [],
  isSelectMessages: false,
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
    resetSelectedMessages: (state, action) => {
      state.selectedMessages = [];
    },
    setIsSelectMessages: (state, action) => {
      state.isSelectMessages = action.payload;
    },
    removeChat: (state, action) => {
      state.chats = state.chats.filter((chat) => chat._id !== action.payload);
    },
    reorderChat: (state, action) => {
      const chatId = action.payload;
      // Find the index of the chat with the specified chatId
      const chatIndex = state.chats.findIndex((chat) => chat._id === chatId);
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
  removeChat,
  reorderChat,
} = chatSlice.actions;

const useChatSlice = () => {
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat);
  const actions = chatSlice.actions;

  const setChats = useCallback(
    (chats) => {
      dispatch(actions.setChats(chats));
    },
    [dispatch]
  );

  const setChat = useCallback(
    (chat) => {
      dispatch(actions.addChat(chat));
    },
    [dispatch]
  );

  const setSelectedChat = useCallback(
    (chat) => {
      dispatch(actions.setSelectedChat(chat));
    },
    [dispatch]
  );

  const removeChat = useCallback(
    (chat) => {
      dispatch(actions.removeChat(chat));
    },
    [dispatch]
  );

  const setIsSelectMessages = useCallback(
    (isSelectedMessage) => {
      dispatch(actions.setIsSelectMessages(isSelectedMessage));
    },
    [dispatch]
  );

  const resetSelectedMessages = useCallback(() => {
    dispatch(actions.resetSelectedMessages());
  }, [dispatch]);

  return {
    ...chat,
    setChats,
    setSelectedChat,
    removeChat,
    setChat,
    setIsSelectMessages,
    resetSelectedMessages,
  };
};

export { useChatSlice };

export default chatSlice.reducer;
