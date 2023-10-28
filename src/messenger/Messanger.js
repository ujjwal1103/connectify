import React, { useCallback, useEffect, useState } from "react";
import CurrentUserInfo from "./component/CurrentUserInfo";
import SingleChat from "./component/SingleChat";
import { useDispatch, useSelector } from "react-redux";
import ChatWindow from "./component/ChatWindow";
import { makeRequest } from "../config/api.config";
import { setChats } from "../redux/services/chatSlice";
import Search from "./component/Search";


const NoSelectedChat = () => {
  return <div className="flex-1 dark:bg-gray-900 bg-gray-50 dark:text-gray-50 t h-screen">no chat selected</div>
}
const Messanger = () => {
  const [searchTerm, setSearchTerm] = useState()
  const [searchResults, setSearchResults] = useState([])
  const { user: currentUser } = JSON.parse(localStorage.getItem("user"));
  const { chats, selectedChat } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  const fetchAllChats = useCallback(async () => {
    const { data } = await makeRequest("chats");
    if (data.isSuccess) {
      dispatch(setChats(data.chats));
    }
  }, [dispatch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value)

    const filteredChats = chats?.filter(chat=>chat.friend.username.includes(e.target.value))
  if(e.target.value){
    setSearchResults(filteredChats);
  }else{
    setSearchResults([]);
  }
}

  useEffect(() => {
    fetchAllChats()
  }, [fetchAllChats]);

  return (
    <div className="bg-gray-100  dark:bg-slate-950 flex h-screen ">
      <div className="flex-[0.5]  bg-gray-950 overflow-auto hidden lg:block xl:block md:block">
        <CurrentUserInfo user={currentUser} />
        <hr />
        <div className="bg-gray-950">
          <Search searchTerm={searchTerm} onChange={handleChange}/>
          {!searchTerm && chats.map((chat) => {
            return <SingleChat chat={chat}/>;
          })}
          {searchResults?.map((chat) => {
            return <SingleChat chat={chat}/>;
          })}
        </div>
      </div>
      {selectedChat ? <ChatWindow currentUserId={currentUser?._id} /> :<NoSelectedChat/> }
    </div>
  );
};

export default Messanger;
