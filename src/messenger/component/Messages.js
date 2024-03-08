import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
import { groupMessagesByDate } from "../../utils/groupMessagesByDate";
import { getCurrentUserId } from "../../utils/getCurrentUserId";

const Messages = () => {
  const { messages } = useSelector((state) => state.chat);
  const [groupedMessages, setGroupedMessages] = useState([]);
  const messagesContainerRef = useRef(null);
  useEffect(() => {
    setGroupedMessages(groupMessagesByDate(messages));
  }, [messages]);
  useEffect(() => {
    if (messagesContainerRef?.current) {
      setTimeout(() => {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current?.scrollHeight;
      }, 1000);
    }
  }, [messages]);

  if (!messages || messages?.length === 0)
    return (
      <div className="h-full flex flex-1 justify-center items-center dark:text-gray-50 text-xl  mb-4 p-2 ">
        Send new message to start a conversation
      </div>
    );

  return (
    <div
      ref={messagesContainerRef}
      className="h-full flex flex-col scroll-smooth flex-1 gap-3  overflow-y-scroll mb-4 p-2 "
    >
      <div>
        {Object.keys(groupedMessages).map((date) => (
          <div key={date} className="flex flex-col gap-3">
            <h3 className="text-center text-[10px]  text-gray-200 w-fit self-center p-1 rounded-xl bg-neutral-950">
              {date}
            </h3>
            {groupedMessages[date].map((message) => (
              <Message
                key={message._id}
                currentUserMessage={message.from === getCurrentUserId()}
                message={message}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
