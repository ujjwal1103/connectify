import React from "react";
import noDp from "../../assets/no_avatar.png";
import { useDispatch } from "react-redux";
import { setSelectedChat } from "../../redux/services/chatSlice";

const SingleChat = ({ chat }) => {
  const { user: currentUser } = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const selectThisChat = () => {
    dispatch(setSelectedChat(chat));
  };

  return (
    <div
      className="w-full flex  gap-4 p-2 items-center border-b-2"
      onClick={selectThisChat}
    >
      <div className="w-10 h-10 rounded-full overflow-clip">
        <img src={chat?.friend?.profilePicture || noDp} alt="" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold">{chat?.friend?.username}</h4>
        {chat?.lastMessage?.from !== currentUser._id && (
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
    </div>
  );
};

export default SingleChat;
