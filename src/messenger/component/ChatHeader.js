import React from "react";
import avatar from "../../assets/no_avatar.png";
const ChatHeader = ({ otherUser }) => {
  return (
    <div className="w-full flex bg-gray-50 dark:bg-slate-950 items-center p-2">
      <div className="w-10 h-10 rounded-full overflow-clip ">
        <img src={otherUser?.profilePicture || avatar} alt="" />
      </div>
      <div className="mx-2 dark:text-gray-50">
        <span className="block text-sm">
          {otherUser?.name || otherUser?.username}
        </span>
        {/* <span className="text-xs">active</span> */}
      </div>
    </div>
  );
};

export default ChatHeader;
