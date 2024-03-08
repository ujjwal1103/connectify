import React, { useState } from "react";
import { getReadableTime } from "../../utils/groupMessagesByDate";

const Message = ({
  currentUserMessage,
  message: { text, createdAt },
  type = "text",
}) => {
  const [showMore, setShowMore] = useState(false);
  const messageLength = text.length;
  const longMessage = messageLength > 200 && messageLength - 200 > 250
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  if (type === "image") {
    return (
      <div
        className={`
      
      max-w-md w-fit p-2 duration-700 transition-all rounded-xl ${
        currentUserMessage
          ? "self-end bg-zinc-800 rounded-br-none"
          : "    bg-black rounded-bl-none"
      } text-gray-50 shadow-2xl
    `}
      >
        <div className="rounded-xl p-2">
          <img
            className="rounded-xl w-64 h-96"
            src={
              "https://images.pexels.com/photos/20412064/pexels-photo-20412064/free-photo-of-portofino.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
          />
        </div>

        <span className="text-[10px] block text-right text-gray-300">
          {getReadableTime(createdAt)}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`
        
        max-w-md w-fit p-2 duration-700 transition-all rounded-xl ${
          currentUserMessage
            ? "self-end bg-zinc-800 rounded-br-none"
            : "    bg-black rounded-bl-none"
        } text-gray-50 shadow-2xl
      `}
    >
      <div className="overflow-hidden break-words">
        {showMore
          ? text
          : text.slice(0, 300) +
            (longMessage ? "..." : "")}
      </div>

      <div className="flex text-[10px] justify-end items-center w-fit float-right flex-col text-right text-gray-300">
        {longMessage && (
          <button
            onClick={toggleShowMore}
            className="text-[10px] bg-gray-300 text-black p-1 rounded-2xl self-end "
          >
            {showMore ? "View Less" : "View More"}
          </button>
        )}
        <span> {getReadableTime(createdAt)}</span>
      </div>
    </div>
  );
};

export default Message;
