import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useCallback, useEffect, useState } from "react";
import { makeRequest } from "../../config/api.config";
import { setMessages, setSelectedChat } from "../../redux/services/chatSlice";
import { getCurrentUserId } from "../../utils/getCurrentUserId";
import { useSocket } from "../../context/SocketContext";

const ChatWindow = () => {
  const { selectedChat, messages } = useSelector((state) => state.chat);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const getAllMessages = useCallback(async () => {
    try {
      const data = await makeRequest(
        `messages/${selectedChat._id}?page=${page}&pageSize=20`
      );
      if (data?.isSuccess) {
        dispatch(setMessages([...data.messages, ...messages]));
        setHasMore(data.hasMore);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, selectedChat._id, page]);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [selectedChat._id]);

  useEffect(() => {
    setLoading(true);
    getAllMessages();
  }, [getAllMessages]);

  useEffect(() => {
    if (socket) {
      const handleMessage = (data) => {
        if (data.from === selectedChat?.friend?._id) {
          setPage(1);
          getAllMessages();
        }
      };

      socket.on("Receive Message", handleMessage);

      return () => {
        socket.off("Receive Message", handleMessage);
      };
    }
  }, [socket, selectedChat._id]);

  useEffect(() => {
    return () => {
      dispatch(setSelectedChat(null));
      dispatch(setMessages([]));
    };
  }, []);

  return (
    <div className="flex-1 bg-zinc-900 h-dvh overflow-hidden flex flex-col">
      <ChatHeader otherUser={selectedChat?.friend} />

      <Messages
        loading={loading && page === 1}
        hasMore={hasMore}
        handlePageChange={() => setPage((prev) => prev + 1)}
      />
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
