import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
import { groupMessagesByDate } from "../../utils/groupMessagesByDate";
import { getCurrentUserId } from "../../utils/getCurrentUserId";
import { BiLoader } from "react-icons/bi";

const Messages = ({
  loading,
  handlePageChange,
  hasMore,
}) => {
  const { messages } = useSelector((state) => state.chat);
  const [groupedMessages, setGroupedMessages] = useState([]);
  const messagesContainerRef = useRef(null);
  useEffect(() => {
    setGroupedMessages(groupMessagesByDate(messages));
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [loading, messages]);

  if (loading) {
    return (
      <div className="h-full flex flex-1 justify-center items-center dark:text-gray-50 text-xl  mb-4 p-2 ">
        <BiLoader size={44} className="animate-spin" />
      </div>
    );
  }

  if (!messages || (messages?.length === 0 && !loading))
    return (
      <div className="h-full flex flex-1 justify-center items-center dark:text-gray-50 text-xl  mb-4 p-2 ">
        Send new message to start a conversation
      </div>
    );

  return (
    <div className="h-full flex flex-col scroll-smooth flex-1 gap-3  overflow-y-scroll overflow-x-hidden mb-4 p-2 ">
      <div>
        {hasMore && messages.length > 10 && (
          <button
            className=" text-[10px] text-center text-gray-200 w-fit self-center p-1 rounded-xl bg-neutral-950"
            onClick={() => {
              handlePageChange();
            }}
          >
            View more messages
          </button>
        )}

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

        <div ref={messagesContainerRef} className="p-2 bg-red-400"></div>
      </div>
    </div>
  );
};

export default Messages;
