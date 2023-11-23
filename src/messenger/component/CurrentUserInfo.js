import React, { useState, useEffect } from "react";
import noDp from "../../assets/no_avatar.png";
import { makeRequest } from "../../config/api.config";
import { useDispatch } from "react-redux";
import { addChat } from "../../redux/services/chatSlice";
const CurrentUserInfo = ({ user }) => {
  const [newUserPopup, setNewUserPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState();
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const getAllUsers = async () => {
    const res = await makeRequest.get("/friends");
    setUsers(res.data.users);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value === "") {
      getAllUsers();
    }
    setUsers((prevs) =>
      prevs.filter((user) => user.username.includes(e.target.value))
    );
  };
  const handleUserSelect = async (userId) => {
    try {
      const response = await makeRequest.post("/chat", { to: userId });
      if (response.data.isSuccess) {
        dispatch(addChat(response.data.chat));
        setNewUserPopup(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex gap-4 p-2 justify-between items-center dark:text-gray-50">
      <div className="flex gap-4 p-2 dark:text-gray-50">
        <div className="w-12 h-12 rounded-full overflow-clip">
          <img src={user?.profilePicture || noDp} alt="" />
        </div>
        <div className="">
          <h4 className="font-semibold">{user?.name}</h4>
          <span className="text-sm">{user.username}</span>
        </div>
      </div>
      <div>
        <button className="p-2" onClick={() => setNewUserPopup(true)}>
          New Chat
        </button>
      </div>

      {newUserPopup && (
        <div className="fixed inset-0 w-screen h-screen bg-black z-10 backdrop-blur-md bg-opacity-80 flex justify-center items-center flex-col">
          <div>
            <button
              className="p-2 absolute right-10 top-10 border rounded-xl"
              onClick={() => setNewUserPopup(false)}
            >
              Cancle
            </button>
          </div>

          <div className="w-1/4  bg-slate-900 shadow-lg rounded-xl p-2">
            <div className="">
              <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                className="border-none shadow-inner w-full rounded-3xl dark:text-black"
              />
            </div>

            {users?.map((user) => {
              return (
                <div
                  className="flex items-center p-4 gap-3 m-2 bg-slate-800 rounded-xl"
                  key={user._id}
                  onClick={() => handleUserSelect(user?._id)}
                >
                  <div className="w-10 h-10 rounded-full overflow-clip">
                    <img src={user.profilePicture || noDp} alt="" />
                  </div>
                  <div>{user.username}</div>
                </div>
              );
            })}
            {users.length === 0 && (
              <div className="flex items-center p-4 gap-3 m-2 bg-slate-800 rounded-xl">
                no user found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentUserInfo;
