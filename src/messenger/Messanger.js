import React, { useCallback, useEffect } from "react";
import CurrentUserInfo from "./component/CurrentUserInfo";
import SingleChat from "./component/SingleChat";
import { useDispatch, useSelector } from "react-redux";
import ChatWindow from "./component/ChatWindow";
import { makeRequest } from "../config/api.config";
import { setChats } from "../redux/services/chatSlice";


const NoSelectedChat = () => {
  return <div className="flex-1 dark:bg-gray-900 bg-gray-50 dark:text-gray-50 t h-screen">no chat selected</div>
}
const Messanger = () => {
  const { user: currentUser } = JSON.parse(localStorage.getItem("user"));
  const { chats, selectedChat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const fetchAllChats = useCallback(async () => {
    const { data } = await makeRequest("chats");
    if (data.isSuccess) {
      dispatch(setChats(data.chats));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchAllChats()
  }, [fetchAllChats]);

  return (
    <div className="bg-gray-100 dark:bg-slate-950 flex h-screen ">
      <div className="flex-[0.5] bg-green-50 overflow-auto hidden lg:block xl:block md:block">
        <CurrentUserInfo user={currentUser} />
        <hr />
        <div className="">
          {chats.map((chat) => {
            return <SingleChat chat={chat}/>;
          })}
        </div>
      </div>
      {selectedChat ? <ChatWindow currentUserId={currentUser?._id} /> :<NoSelectedChat/> }
    </div>
  );
};

export default Messanger;
