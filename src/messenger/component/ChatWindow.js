import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useCallback, useEffect } from "react";
import { makeRequest } from "../../config/api.config";
import { setMessages } from "../../redux/services/chatSlice";

const ChatWindow = () => {
  const { selectedChat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const { user: currentUser } = JSON.parse(localStorage.getItem("user"));

  const getAllMessages = useCallback(async () => {
    try {
      const data = await makeRequest(`messages/${selectedChat._id}`);
      if (data?.isSuccess) {
        dispatch(setMessages(data.messages));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, selectedChat._id]);

  useEffect(() => {
    getAllMessages();
  }, [getAllMessages]);

  return (
    <div className="flex-1 bg-slate-900 h-screen overflow-hidden flex flex-col">
      <ChatHeader otherUser={selectedChat?.friend} />
      <hr />

      <Messages />
      <div className="bg-gray-500">
        <MessageInput
          userId={selectedChat?.friend?._id}
          currentUserId={currentUser._id}
          chatId={selectedChat?._id}
          getMessages={getAllMessages}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
