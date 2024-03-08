import React, { useCallback, useEffect, useState } from "react";
import CurrentUserInfo from "./component/CurrentUserInfo";
import SingleChat from "./component/SingleChat";
import { useDispatch, useSelector } from "react-redux";
import { makeRequest } from "../config/api.config";
import { setChats } from "../redux/services/chatSlice";
import Search from "./component/Search";
import { Outlet, useParams } from "react-router-dom";
import { MessengerLine } from "../icons";
import NewChatBtn from "./component/NewChatBtn";

const NoSelectedChat = () => {
  return (
    <div className="flex-1 dark:bg-zinc-900 hidden bg-gray-50 dark:text-gray-50 t h-screen lg:flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <div className="w-20 h-20 border-2 border-white rounded-full flex justify-center items-center">
          <MessengerLine size={60} />
        </div>
        <h1>Your Messages</h1>
        <p>Send private photos and messages to a friend or group</p>
        <NewChatBtn
          title="Send Messages"
          className="p-2 bg-blue-600 rounded-lg my-2"
        />
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

  return (
    <main className="bg-gray-100  dark:bg-zinc-950 flex h-screen ">
      <div
        className={`lg:flex-[0.5] md:flex-[0.5] xl:flex-[0.5] flex-1 ${
          chatId && "hidden lg:block "
        } bg-zinc-950 overflow-auto  xl:block md:block border-r border-zinc-700`}
      >
        <CurrentUserInfo user={currentUser} />
       
        <div className="dark:bg-zinc-950 h-full">
          <Search searchTerm={searchTerm} onChange={handleChange} />
          {!searchTerm &&
            chats?.map((chat) => {
              return <SingleChat key={chat._id} chat={chat} />;
            })}
          {searchResults?.map((chat) => {
            return <SingleChat key={chat._id} chat={chat} />;
          })}
        </div>
      </div>
      {selectedChat && chatId ? <Outlet /> : <NoSelectedChat />}
    </main>
  );
};

export default Messenger;
