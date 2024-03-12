import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { makeRequest } from "../../config/api.config";
import ProfilePicture from "../../common/ProfilePicture";
import UsernameLink from "../../shared/UsernameLink";
import { addChat } from "../../redux/services/chatSlice";
import { useNavigate } from "react-router-dom";
import Modal from "../../shared/Modal";
import { getCurrentUserId } from "../../utils/getCurrentUserId";

const NewChatBtn = ({ title, className = "" }) => {
  const [newUserPopup, setNewUserPopup] = useState(false);
  return (
    <div>
      <button className={className} onClick={() => setNewUserPopup(true)}>
        {title}
      </button>

      {newUserPopup && (
        <Modal onClose={() => setNewUserPopup(false)}>
          <AddNewUser />
        </Modal>
      )}
    </div>
  );
};

export default NewChatBtn;

const AddNewUser = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllUsers = useCallback(async () => {
    try {
      const res = await makeRequest.get(`/following/${getCurrentUserId()}`);
      setUsers([...res.followings]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value === "") {
      getAllUsers();
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
        dispatch(addChat(response.chat));
        onClose();
        navigate(`/messenger/${response.chat._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" overflow-hidden  rounded-xl">
      <div className="md:w-96 w-screen bg-zinc-950 min-h-80 md:h-follow h-dvh shadow-lg p-2">
        <div className="p-2 mb-2 rounded-sm shadow-lg text-gray-50">
          <h1>New Chat</h1>
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
        {users.length === 0 && (
          <div className="flex items-center p-4 gap-3 m-2 bg-slate-800 rounded-xl">
            no user found
          </div>
        )}
        <div
          className={`overflow-y-scroll md:h-80 h-dvh`}
        >
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
