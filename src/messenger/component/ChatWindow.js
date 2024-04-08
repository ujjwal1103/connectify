import { useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useCallback, useEffect, useRef, useState } from "react";

import { getCurrentUserId } from "../../utils/getCurrentUserId";
import { useInfiniteScrollTop } from "../../hooks/useInfiniteScrollTop";
import { groupMessagesByDate } from "../../utils/groupMessagesByDate";
import useSocketEvents from "../../hooks/useSocketEvents";
import { NEW_MESSAGE, SEEN_MESSAGES } from "../../utils/constant";
import { useSocket } from "../../context/SocketContext";
import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../../redux/services/messageApi";
import { sendNotification } from "../../home/notification/Services";

const ChatWindow = () => {
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState([]);

  const containerRef = useRef(null);

  const { selectedChat } = useSelector((state) => state.chat);

  const { chatId } = useParams();

  const {
    data: oldMessagesChunk,
    isLoading,
    refetch,
  } = useGetMessagesQuery({ chatId, page });
  const { socket } = useSocket();

  const [data, setData] = useInfiniteScrollTop(containerRef, oldMessagesChunk?.totalPages, page, setPage, oldMessagesChunk?.messages)


  useEffect(() => {
    refetch();
    ()=>{
      setData([])
    }
  }, [chatId]);

  const handleMessage = useCallback(
    async(data) => {
      if (data.from === selectedChat?.friend?._id) {
        setMessages(prev=>[...prev, {...data.message, seen:true}])

        await sendNotification(data.message.from, SEEN_MESSAGES, socket, chatId, data.message);
      }
    },
    [chatId]
  );
  const handleSeen = useCallback((data) => {
    if (data.message.chatId === chatId) {
      setMessages(prev => prev.map(message => {
        if (message._id === data.message._id) {
          // If the message ID matches, update the 'seen' property
          return { ...message, seen: true };
        }
        return message; // For other messages, return unchanged
      }));
    }
  }, [chatId]);

  const eventHandlers = {
    [NEW_MESSAGE]: handleMessage,
    [SEEN_MESSAGES]: handleSeen,
  };

  useSocketEvents(socket, eventHandlers);

  return (
    <div className="flex-1 bg-zinc-900 h-dvh overflow-hidden flex flex-col">
      <ChatHeader otherUser={selectedChat?.friend} />
      <Messages
        ref={containerRef}
        allMessages={groupMessagesByDate([...data, ...messages])}
        isLoading={isLoading}
        page={page}
      />
      <div className="bg-zinc-950 border-t-[0.5px] border-zinc-700">
    <MessageInput
          userId={selectedChat?.friend?._id}
          currentUserId={getCurrentUserId()}
          chatId={selectedChat?._id}
          onMessage={(message)=>{
            setMessages(prev=>[...prev, message])
          }}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
