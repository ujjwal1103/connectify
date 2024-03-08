import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedChat } from "../../redux/services/chatSlice";
import { DotsNine } from "../../icons";
import ProfilePicture from "../../common/ProfilePicture";
import { useNavigate } from "react-router-dom";
import {  isCurrentUser } from "../../utils/getCurrentUserId";

const SingleChat = ({ chat }) => {
  const [options, setOptions] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectThisChat = () => {
    dispatch(setSelectedChat(chat));
    navigate(`/messenger/${chat._id}`);
  };

  const handleOptions = () => {
    setOptions((prev) => !prev);
  };

  return (
    <div
      className="w-full flex  gap-4 p-2 items-center dark:text-gray-50 border-b-[0.5px] border-zinc-800 last:border-0"
      onClick={selectThisChat}
    >
      <ProfilePicture
        url={chat?.friend?.avatar}
        className="inline-block h-10 w-10 rounded-full hover:scale-90 duration-500 object-cover"
      />
      <div className="flex-1">
        <h4 className="font-semibold">{chat?.friend?.username}</h4>
        {!isCurrentUser(chat?.lastMessage?.from) && (
          <span className="text-sm overflow-ellipsis line-clamp-1">
            {chat?.lastMessage?.text}
          </span>
        )}
      </div>
      {chat?.unreadCount && (
        <div className="w-5 h-5 flex justify-center items-center rounded-full bg-green-700">
          <span className="text-sm text-white">{}</span>
        </div>
      )}

      <div
        className="w-5 h-5 flex relative justify-center items-center text-black"
        onMouseEnter={handleOptions}
        onMouseLeave={handleOptions}
      >
        <span className="hidden lg:block">
          <DotsNine className="fill-zinc-200" />
        </span>

        {options && (
          <div
            className="absolute  bg-white z-50 dark:bg-zinc-900 shadow-2xl origin-bottom-right top-1/2 right-0 p-1  rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="text-sm w-28 text-center">
              <li className="py-2 dark:text-gray-50 rounded-md hover:bg-zinc-800 hover:shadow-md transition-colors duration-300 ease-in-out">
                <button>Archive</button>
              </li>
              <li className="py-2 dark:text-gray-50 rounded-md hover:bg-zinc-800 hover:shadow-md transition-colors duration-300 ease-in-out">
                <button>Delete</button>
              </li>
              <li className="py-2 dark:text-gray-50 rounded-md hover:bg-zinc-800 hover:shadow-md transition-colors duration-300 ease-in-out">
                <button>Mute</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleChat;
