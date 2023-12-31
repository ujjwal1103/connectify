import React, { useCallback, useEffect, useState } from "react";
import CurrentUserInfo from "./component/CurrentUserInfo";
import SingleChat from "./component/SingleChat";
import { useDispatch, useSelector } from "react-redux";
import ChatWindow from "./component/ChatWindow";
import { makeRequest } from "../config/api.config";
import { setChats } from "../redux/services/chatSlice";
import Search from "./component/Search";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { MessengerLine } from "../icons";
import NewChatBtn from "./component/NewChatBtn";

const NoSelectedChat = () => {
  return (
    <div className="flex-1 dark:bg-gray-900 bg-gray-50 dark:text-gray-50 t h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <div className="w-20 h-20 border-2 border-white rounded-full flex justify-center items-center">
          <MessengerLine size={60} />
        </div>
        <h1>Your Messages</h1>
        <p>Send private photos and messages to a friend or group</p>
        <NewChatBtn title="Send Messages" className="p-2 bg-blue-600 rounded-lg my-2" />
      </div>
    </div>
  );
};
const Messenger = () => {
  const [searchTerm, setSearchTerm] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const { user: currentUser } = JSON.parse(localStorage.getItem("user"));
  const { chats, selectedChat, messageChatId } = useSelector(
    (state) => state.chat
  );

  const dispatch = useDispatch();
  const { chatId } = useParams();

  const fetchAllChats = useCallback(async () => {
    try {
      const data = await makeRequest("chats");
      if (data.isSuccess) {
        dispatch(setChats(data.chats));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, messageChatId]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);

    const filteredChats = chats?.filter((chat) =>
      chat.friend.username.includes(e.target.value)
    );
    if (e.target.value) {
      setSearchResults(filteredChats);
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    fetchAllChats();
  }, [fetchAllChats]);

  console.log(chatId);

  return (
    <div className="bg-gray-100  dark:bg-slate-950 flex h-screen ">
      <div className="flex-[0.5]  bg-gray-950 overflow-auto hidden lg:block xl:block md:block">
        <CurrentUserInfo user={currentUser} />
        <hr />
        <div className="bg-gray-950">
          <Search searchTerm={searchTerm} onChange={handleChange} />
          {!searchTerm &&
            chats?.map((chat) => {
              return <SingleChat chat={chat} />;
            })}
          {searchResults?.map((chat) => {
            return <SingleChat chat={chat} />;
          })}
        </div>
      </div>
      {selectedChat && chatId ? <Outlet /> : <NoSelectedChat />}
    </div>
  );
};

export default Messenger;
