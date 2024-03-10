import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "../../redux/services/chatSlice";
import { DotsNine } from "../../icons";
import ProfilePicture from "../../common/ProfilePicture";
import { useNavigate, useParams } from "react-router-dom";
import { isCurrentUser } from "../../utils/getCurrentUserId";

const SingleChat = ({ chat }) => {
  const [options, setOptions] = useState(false);
  const { chatId } = useParams();
  const { selectedChat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectThisChat = () => {
    if (selectedChat?._id !== chat._id || !chatId) {
      dispatch(setSelectedChat(chat));
      navigate(`/messenger/${chat._id}`);
    }
  };

  const handleOptions = () => {
    setOptions((prev) => !prev);
  };

  return (
    <div
      className={`w-full flex  gap-4 p-2 ${
        selectedChat?._id === chat._id && "bg-zinc-800"

      } hover:bg-zinc-900 items-center dark:text-gray-50 border-b-[0.5px] cursor-pointer border-zinc-800 last:border-0`}
      onClick={selectThisChat}
    >
      <ProfilePicture
        url={chat?.friend?.avatar}
        className="inline-block lg:size-10 size-8 rounded-full hover:scale-90 duration-500 object-cover"
      />
      <div className="flex-1">
        <h4 className="font-semibold lg:text-base text-xs">{chat?.friend?.username}</h4>
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
        <span className="">
          <DotsNine className="fill-zinc-200" />
        </span>

        {options && (
          <div
            className="absolute  bg-white z-50 dark:bg-zinc-950 shadow-2xl origin-bottom-right top-1/2 right-0 p-1  rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="text-sm lg:w-28 w-24 text-center">
              <li className="dark:text-gray-50 rounded-md hover:bg-zinc-800 hover:shadow-md transition-colors duration-300 ease-in-out">
                <button onClick={()=>{
                  console.log("archived clicked")
                  setOptions(false)
                }} className="lg:py-2 py-1 text-xs w-full rounded-md">
                  Archive
                </button>
              </li>
              <li className=" dark:text-gray-50 text-xs rounded-md hover:bg-zinc-800 hover:shadow-md transition-colors duration-300 ease-in-out">
                <button onClick={()=>{
                  console.log('delete clicked')
                  setOptions(false)
                }} className="lg:py-2 py-1   w-full rounded-md">
                  Delete
                </button>
              </li>
              <li className="text-xs dark:text-gray-50 rounded-md hover:bg-zinc-800 hover:shadow-md transition-colors duration-300 ease-in-out">
                <button onClick={()=>{
                  console.log('mute a chat')
                  setOptions(false)
                }} className="lg:py-2 py-1  w-full rounded-md">
                  Mute
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(SingleChat);
