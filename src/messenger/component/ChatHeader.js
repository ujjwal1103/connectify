import React from "react";
import ProfilePicture from "../../common/ProfilePicture";
import { ChevronBack } from "../../icons";
import { Link } from "react-router-dom";
const ChatHeader = ({ otherUser }) => {
  return (
    <div className="w-full flex bg-gray-50 dark:bg-zinc-950 border-b dark:border-zinc-700  items-center p-2">
        <Link
        to={'/messenger'}
        className="lg:hidden"
        >
          <ChevronBack size={24} />
        </Link>
      <ProfilePicture
        url={otherUser?.avatar}
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
