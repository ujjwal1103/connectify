import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useCallback, useEffect } from "react";
import { makeRequest } from "../../config/api.config";
import { setMessages } from "../../redux/services/chatSlice";
import { getCurrentUserId } from "../../utils/getCurrentUserId";
import { useSocket } from "../../context/SocketContext";

const ChatWindow = () => {
  const { selectedChat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const { socket } = useSocket();
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

  useEffect(() => {
    if (socket) {
      socket.on("Receive Message", (data) => {
        getAllMessages();
      });
    }
  }, [socket, getAllMessages]);

  return (
    <div className="flex-1 bg-zinc-900 h-screen overflow-hidden flex flex-col">
      <ChatHeader otherUser={selectedChat?.friend} />

      <Messages />
      <div className="bg-zinc-950 border-t-[0.5px] border-zinc-700">
        <MessageInput
          userId={selectedChat?.friend?._id}
          currentUserId={getCurrentUserId()}
          chatId={selectedChat?._id}
          getMessages={getAllMessages}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
