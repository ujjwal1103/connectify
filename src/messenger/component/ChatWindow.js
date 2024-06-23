import { useDispatch } from "react-redux";
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
import { useChatSlice } from "../../redux/services/chatSlice";
import { markMessageAsSeen } from "../../api";

const ChatWindow = () => {
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState([]);

  const { selectedChat, setIsSelectMessages, resetSelectedMessages } =
    useChatSlice();

  const { socket } = useSocket();
  const { chatId } = useParams();
  const containerRef = useRef(null);

  const { data: oldMessagesChunk, isLoading } = useGetMessagesQuery({
    chatId,
    page,
  });

  const [data, setData] = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk?.totalPages,
    page,
    setPage,
    oldMessagesChunk?.messages,
    false,
    chatId
  );


  useEffect(() => {
    return () => {
      console.log('triggered')
      setData([]);
      setMessages([]);
      setPage(1);
      setIsSelectMessages(false);
      resetSelectedMessages();
    };
  }, [chatId]);

  const handleMessage = useCallback(
    async (data) => {
      if (data.from === selectedChat?.friend?._id) {
        setMessages((prev) => [...prev, { ...data.message, seen: true }]);
        const re = await markMessageAsSeen(data.message._id)
        if(re){
          await sendNotification(
            data.message.from,
            SEEN_MESSAGES,
            socket,
            chatId,
            data.message
          );
        }
        await sendNotification(
          data.message.from,
          SEEN_MESSAGES,
          socket,
          chatId,
          data.message
        );
      }
    },
    [chatId]
  );





  const eventHandlers = {
    [NEW_MESSAGE]: handleMessage, 
  };

  useSocketEvents(socket, eventHandlers);

  return (
    <div className="flex-1 dark:bg-zinc-900 h-dvh overflow-hidden flex flex-col">
      <ChatHeader otherUser={selectedChat?.friend} />
      <Messages
        ref={containerRef}
        allMessages={groupMessagesByDate([...data, ...messages])}
        isLoading={isLoading}
        page={page}
        messages={messages}
      />
      <div className="dark:bg-zinc-950 border-t-[0.5px] border-zinc-700">
        <MessageInput
          setData={setData}
          userId={selectedChat?.friend?._id}
          currentUserId={getCurrentUserId()}
          chatId={selectedChat?._id}
          onMessage={(message) => {
            console.log('message send successfull')
            setMessages((prev) => [...prev, message]);
          }}
        />
      </div>
    </div>  
  );
};

export default ChatWindow;
