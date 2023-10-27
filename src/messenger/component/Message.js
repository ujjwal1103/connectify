import React from "react";
import { getReadableTime } from "../../utils/groupMessagesByDate";

const Message = ({ currentUserMessage, message }) => {
  return (
    <div
      className={`${
        currentUserMessage
          ? "bg-slate-900 max-w-md w-fit p-2 rounded-md self-end text-gray-50"
          : "bg-gray-200 max-w-md w-fit p-2 rounded-md"
      }`}
    >
      <span> {message.text}</span>
      <span className="text-xs block text-right text-gray-300 ">
        {getReadableTime(message.createdAt)}
      </span>
    </div>
  );
};

export default Message;
