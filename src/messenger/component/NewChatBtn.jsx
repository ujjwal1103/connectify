import React, { useState, useEffect, useCallback } from "react";
import { makeRequest } from "../../config/api.config";
import ProfilePicture from "../../common/ProfilePicture";
import UsernameLink from "../../shared/UsernameLink";
import { useChatSlice } from "../../redux/services/chatSlice";
import { useNavigate } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";
import { BiLoader } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

const NewChatBtn = ({ title, className = "" }) => {
  const [newUserPopup, setNewUserPopup] = useState(false);
  return (
    <div>
      <button className={className} onClick={() => setNewUserPopup(true)}>
        {title}
      </button>
      <AnimatePresence>
        {newUserPopup && <Drawer onClose={() => setNewUserPopup(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default NewChatBtn;

const AddNewUser = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {setChat} = useChatSlice()
  const navigate = useNavigate();

  const getAllUsers = useCallback(async (showLoader = true) => {
    showLoader && setIsLoading(true);
    try {
      const res = await makeRequest.get(`/newchat/users`);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value === "") {
      getAllUsers(false);
    }
    setUsers((prevs) =>
      prevs.filter((user) => user?.username.includes(e.target.value))
    );
  };
  
  const handleUserSelect = async (userId) => {
    try {
      setLoading(true);
      const response = await makeRequest.post("/chat", { to: userId });
      if (response.isSuccess) {
        setChat(response.chat);
        onClose();
        navigate(`/messenger/${response.chat._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className=" overflow-y-scroll h-full">
      <div className="md:w-96 w-screen bg-zinc-950  md:h-follow h-dvh shadow-lg p-2">
        <div className="p-2 mb-2 rounded-sm shadow-lg text-gray-50 flex-between">
          <h1>New Chat</h1>
          <button type="button" onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>
        <div className="px-2 bg-transparent">
          <input
            type="text"
            value={searchTerm}
            placeholder="Search Friend"
            onChange={handleChange}
            className="border-none shadow-inner dark:text-white w-full bg-zinc-800 mb-2  rounded-3xl "
          />
        </div>
        {!isLoading && users.length === 0 && (
          <div className="flex items-center p-4 gap-3 m-2 bg-zinc-800 rounded-xl">
            no user found
          </div>
        )}

        {isLoading && (
          <div className="flex-center">
            <BiLoader className="animate-spin text-white" size={24} />
          </div>
        )}
        <div className="pb-2">
          {users?.map((user) => {
            return (
              <div
                className="flex group items-center p-2 gap-3 m-2 bg-zinc-900 rounded-xl"
                key={user._id}
              >
                <ProfilePicture
                  url={user?.avatar}
                  className="inline-block h-8 w-8  rounded-full hover:scale-90 duration-500 object-cover"
                />
                <UsernameLink
                  username={user?.username}
                  className="text-sm dark:text-white"
                />

                <div className="flex-1 flex justify-end w-full">
                  <button
                    disabled={loading}
                    onClick={() => handleUserSelect(user?._id)}
                    className="bg-blue-600 disabled:opacity-65 overflow-hidden text-gray-50 text-xs  rounded-lg w-0 p-0  group-hover:w-auto group-hover:p-1 group-hover:transition-all transition-all"
                  >
                    Chat
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Drawer = ({ onClose }) => {
  const drawerVarient = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <div className="fixed flex justify-end h-full top-0 z-[1000] w-full bg-black bg-opacity-50 right-0">
      <div className="flex-1 bg-transparent" onClick={onClose} />
      <motion.div
        variants={drawerVarient}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.2 }}
        exit={"hidden"}
        className="h-dvh dark:bg-zinc-950 lg:w-auto w-screen shadow-2xl"
      >
        <AddNewUser onClose={onClose} />
      </motion.div>
    </div>
  );
};
