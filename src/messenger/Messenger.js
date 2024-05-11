import React, { useCallback, useEffect, useState } from "react";
import CurrentUserInfo from "./component/CurrentUserInfo";
import SingleChat from "./component/SingleChat";
import { useChatSlice } from "../redux/services/chatSlice";
import Search from "./component/Search";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { MessengerLine } from "../icons";
import NewChatBtn from "./component/NewChatBtn";
import { useSocket } from "../context/SocketContext";
import { NEW_MESSAGE, REFECTCH_CHATS } from "../utils/constant";
import useSocketEvents from "../hooks/useSocketEvents";
import { AnimatePresence } from "framer-motion";
import { getConversations } from "../api";
import { useDebounce } from "../utils/hooks/useDebounce";
import { BiLoader, BiLoaderAlt } from "react-icons/bi";
import { Loader } from "./component/MessageInput";
import { useGetQuery } from "../utils/hooks/useGetQuery";

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
  const debouceSearch = useDebounce(searchTerm, 400);
  const { chats, selectedChat, setChats } = useChatSlice();

  const {  isLoading, error, refech } = useGetQuery({
    fn: () => getConversations(debouceSearch),
    deps: [debouceSearch],
    onSuccess: (data) => {
      setChats(data.chats);
    },
  });

  const navigate = useNavigate();

  const { chatId } = useParams();

  const { socket } = useSocket();

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMessage = useCallback(() => {
    refech();
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
        <CurrentUserInfo />
        <div
          className="dark:bg-zinc-950 bg-gray-100 overflow-y-scroll scroll-smooth  "
          style={{ height: "calc(100% - 80px)" }}
        >
          <Search searchTerm={searchTerm} onChange={handleChange} />
          {isLoading && (
            <div className="p-2 bg-neutral-900-900 flex gap-3 items-center">
              <BiLoaderAlt className="animate-spin size-10" />{" "}
              <span>Loading...</span>
            </div>
          )}
          <AnimatePresence mode="popLayout">
            {!chats.length && !isLoading && !error ? (
              <div className="p-2 bg-neutral-900-900 flex gap-3 items-center">
              
              <span>No Chats Found!</span>
            </div>
            ) : (
              chats?.map((chat, index) => {
                return <SingleChat index={index} key={chat._id} chat={chat} />;
              })
            )}
          </AnimatePresence>
        </div>
      </div>
      {selectedChat && chatId ? (
        <Outlet context={"props"} />
      ) : (
        <NoSelectedChat />
      )}
    </main>
  );
};

export default Messenger;


