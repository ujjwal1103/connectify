import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
import { groupMessagesByDate } from "../../utils/groupMessagesByDate";

const Messages = () => {
  const { user: currentUser } = JSON.parse(localStorage.getItem("user"));
  const { messages } = useSelector((state) => state.chat);
  const [groupedMessages, setGroupedMessages] = useState([]);
  const messagesRef = useRef(null);

  useEffect(() => {
    console.log(groupMessagesByDate(messages));
    setGroupedMessages(groupMessagesByDate(messages));
    messagesRef && messagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!messages || messages?.length === 0)
    return (
      <div className="h-full flex flex-1 justify-center items-center dark:text-gray-50 text-xl  mb-4 p-2 ">
        Send new message to start a conversation
      </div>
    );

  return (
    <div
      ref={messagesRef}
      className="h-full flex flex-col flex-1 gap-3  overflow-y-scroll mb-4 p-2 "
    >
      {Object.keys(groupedMessages).map((date) => (
        <div key={date} className="flex flex-col gap-3">
          <h3 className="text-center text-xs  text-gray-200 w-fit self-center p-1 rounded-xl bg-gray-600">
            {date}
          </h3>
          {groupedMessages[date].map((message) => (
            <Message
              currentUserMessage={message.from === currentUser._id}
              message={message}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Messages;
