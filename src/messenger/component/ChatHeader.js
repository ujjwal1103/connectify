import React from "react";
import ProfilePicture from "../../common/ProfilePicture";
const ChatHeader = ({ otherUser }) => {
  return (
    <div className="w-full flex bg-gray-50 dark:bg-slate-950 items-center p-2">
      <ProfilePicture
        url={otherUser?.profilePicture}
        className="inline-block h-10 w-10 rounded-full hover:scale-90 duration-500 object-cover"
      />
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
