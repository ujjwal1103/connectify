import React, { useCallback, useEffect, useState } from "react";
import CurrentUserInfo from "./component/CurrentUserInfo";
import SingleChat from "./component/SingleChat";
import { useDispatch, useSelector } from "react-redux";
import { makeRequest } from "../config/api.config";
import { setChats } from "../redux/services/chatSlice";
import Search from "./component/Search";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { MessengerLine } from "../icons";
import NewChatBtn from "./component/NewChatBtn";
import { useSocket } from "../context/SocketContext";
import { NEW_MESSAGE, REFECTCH_CHATS } from "../utils/constant";
import useSocketEvents from "../hooks/useSocketEvents";
import { AnimatePresence } from "framer-motion";

const NoSelectedChat = () => {
  return (
    <div className="flex-1  hidden  dark:text-gray-50 t h-screen lg:flex md:flex justify-center items-center">
      <div className="flex flex-col justify-center items-center ">
        <div className="w-20 h-20 border-2 border-white rounded-full flex justify-center items-center dark:text-gray-50 ">
          <MessengerLine size={60} />
        </div>
        <h1 className="dark:text-gray-50">Your Messages</h1>
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
  const { chats, selectedChat } = useSelector((state) => state.chat);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chatId } = useParams();

  const { socket } = useSocket();

  const fetchAllChats = useCallback(async () => {
    try {
      const data = await makeRequest("chats");
      if (data.isSuccess) {
        dispatch(setChats(data.chats));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

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

  const handleMessage = useCallback((data) => {
    fetchAllChats();
  }, []);

  const eventHandlers = {
    [NEW_MESSAGE]: handleMessage,
    [REFECTCH_CHATS]: handleMessage,
  };

  useSocketEvents(socket, eventHandlers);

  useEffect(() => {
    if (!selectedChat && chatId) {
      navigate("/messenger", { replace: true });
    }
  }, [chatId, navigate]);

  return (
    <main className="bg-gray-100 overflow-y-hidden dark:bg-zinc-950 flex h-dvh  ">
      <div
        className={`lg:flex-[0.5] md:flex-[0.5] xl:flex-[0.5] flex-1 resize-x ${
          chatId && "hidden lg:block "
        } bg-zinc-950  xl:block md:block border-r  border-zinc-700`}
      >
        <CurrentUserInfo user={currentUser} />
        <div
          className="dark:bg-zinc-950 overflow-y-scroll scroll-smooth  bg-red-400"
          style={{ height: "calc(100% - 80px)" }}
        >
          <Search searchTerm={searchTerm} onChange={handleChange} />
          <AnimatePresence>
            {!searchTerm &&
              chats?.map((chat, index) => {
                return (
                  <SingleChat
                    index={index}
                    key={chat._id}
                    chat={chat}
                    refechChats={fetchAllChats}
                  />
                );
              })}
          </AnimatePresence>
          <AnimatePresence>
            {searchResults?.map((chat, index) => {
              return (
                <SingleChat
                  index={index}
                  key={chat._id}
                  chat={chat}
                  efechChats={fetchAllChats}
                />
              );
            })}
          </AnimatePresence>
          
        </div>
      </div>
      {selectedChat && chatId ? <Outlet /> : <NoSelectedChat />}
    </main>
  );
};

export default Messenger;
