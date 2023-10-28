import React, { useState } from "react";
import noDp from "../../assets/no_avatar.png";
import { useDispatch } from "react-redux";
import { setSelectedChat } from "../../redux/services/chatSlice";
import { DotsNine } from "../../icons";

const SingleChat = ({ chat }) => {
  const [options, setOptions] = useState(false)
  const { user: currentUser } = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const selectThisChat = () => {
    dispatch(setSelectedChat(chat));
  };

  const handleOptions = () => {
    setOptions(prev=>!prev)
  }

  return (
    <div
      className="w-full flex  gap-4 p-2 items-center dark:text-gray-50"
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
    
        <div className="w-5 h-5 flex relative justify-center items-center text-black" onMouseEnter={handleOptions} onMouseLeave={handleOptions}>
          <span className=""><DotsNine/></span>

          {options && <div className="absolute bg-white origin-bottom-right top-1/2 right-0 py-2 rounded-md">
        <ul className="text-sm w-20 text-center">
          <li className="py-2 hover:bg-gray-100 "><button>Archive</button></li>
          <li className="py-2 hover:bg-gray-100 "><button>Delete</button></li>
          <li className="py-2 hover:bg-gray-100 "><button>Mute</button></li>
        </ul>
      </div>}
        </div>
 

 
    </div>
  );
};

export default SingleChat;
