import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeRequest } from "../../config/api.config";
import ProfilePicture from "../../common/ProfilePicture";
import UsernameLink from "../../shared/UsernameLink";
import { addChat } from "../../redux/services/chatSlice";
import { useNavigate } from "react-router-dom";

const NewChatBtn = ({ title, className = "" }) => {
  const [newUserPopup, setNewUserPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState();
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getAllUsers = async () => {
    const res = await makeRequest.get("/friends");
    setUsers(res.users.slice(0, 5));
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
      prevs.filter((user) => user?.username.includes(e.target.value))
    );
  };
  const handleUserSelect = async (userId) => {
    try {
      const response = await makeRequest.post("/chat", { to: userId });
      if (response.isSuccess) {
        dispatch(addChat(response.chat));
        setNewUserPopup(false);
        navigate(`/messenger/${response.chat._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button className={className} onClick={() => setNewUserPopup(true)}>
        {title}
      </button>

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

          <div className="w-96 h-96 overflow-scroll  bg-slate-950 shadow-lg rounded-xl p-2">
            <div className="">
              <input
                type="text"
                value={searchTerm}
                placeholder="Search Friend"
                onChange={handleChange}
                className="border-none shadow-inner w-full rounded-3xl dark:text-black"
              />
            </div>

            {users?.map((user) => {
              return (
                <div
                  className="flex group items-center  p-2 gap-3 m-2 bg-slate-800 rounded-xl"
                  key={user._id}
                >
                  <ProfilePicture
                    url={user?.profilePicture}
                    className="inline-block h-8 w-8  rounded-full hover:scale-90 duration-500 object-cover"
                  />
                  <UsernameLink username={user?.username} className="text-sm" />

                  <div className="flex-1 flex justify-end w-full">
                    <button
                      onClick={() => handleUserSelect(user?._id)}
                      className="bg-blue-600 overflow-hidden  text-xs  rounded-lg w-0 p-0  group-hover:w-auto group-hover:p-1 group-hover:transition-all transition-all"
                    >
                      Chat
                    </button>
                  </div>
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

export default NewChatBtn;
