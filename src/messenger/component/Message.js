import React, { useState } from "react";
import { getReadableTime } from "../../utils/groupMessagesByDate";

const Message = ({ currentUserMessage, message }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div
      className={`
        
        max-w-md w-fit p-2 duration-700 transition-all rounded-md ${currentUserMessage ? "self-end bg-slate-800" : "    bg-gray-950"} text-gray-50
      `}
    >
      <div className="">
        {showMore ? (
          message.text
        ) : (
          // Display a truncated version of the message
          message.text.slice(0, 300) + (message.text.length > 100 ? "..." : "")
        )}
      </div>
      {message.text.length > 100 && (
        <button onClick={toggleShowMore} className="text-xs bg-gray-300 text-black p-1 rounded-2xl self-end ">
          {showMore ? "View Less" : "View More"}
        </button>
      )}
      <span className="text-xs block text-right text-gray-300">
        {getReadableTime(message.createdAt)}
      </span>
    </div>
  );
};

export default Message;
