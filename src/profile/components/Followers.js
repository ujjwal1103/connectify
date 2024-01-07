import { useState, useEffect } from "react";
import { makeRequest } from "../../config/api.config";
import avatar from "../../assets/man.png";
import { useNavigate } from "react-router-dom";
import { OutlineClose, Search } from "../../icons";
import Input from "../../common/InputFields/Input";
import { profileState, setFollower } from "../../redux/services/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import FollowButton from "../../shared/FollowButton";

const Followers = ({ userId }) => {
  const { user: currentUser } = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { followers =[ ] } = useSelector(profileState);
  const dispatch = useDispatch();
  useEffect(() => {
    const getFollowers = async () => {
      try {
        const data = await makeRequest.get(`/followers/${userId}`);
        if (data.isSuccess) {
          dispatch(setFollower(data.followers));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFollowers();
  }, [userId]);

  const navigateToUser = (username) => {
    if (username === currentUser?.username) {
      navigate(`/profile`);
    } else {
      navigate(`/${username}`);
    }
  };
  
  const handleRemoveFollower = (userId)=>{
     
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-96 bg-white dark:bg-gray-950 rounded-lg ">
        <div className=" text-black dark:text-white text-center w-full p-3 ">
          <h2 className="text-xl">Followers</h2>
        </div>
        <hr />
        <div>
          <div className="w-full p-2">
            <Input
              type="text"
              className="w-full p-3 outline-none border-none ml-5 focus:outline-none focus:ring-0 bg-transparent"
              placeholder="search"
              prefix={<Search className="text-gray-800" />}
            />
          </div>
        </div>
        <div className="overflow-y-scroll">
          {followers?.map((user) => (
            <div className="m-3" key={user?._id}>
              <div className="flex items-center dark:bg-slate-600 justify-between space-x-2 hover:scale-90 duration-500 bg-slate-50 shadow-lg m-2 p-2 rounded-lg  ">
                <div className="flex items-center space-x-2">
                  <img
                    className="inline-block h-12 w-12 rounded-full hover:scale-90 duration-500 object-cover"
                    src={user?.profilePicture || avatar}
                    alt={user?.username}
                  />
                  <button
                    onClick={() => navigateToUser(user?.username)}
                    className="flex flex-col"
                  >
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {user?.name}
                    </span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {user?.username}
                    </span>
                  </button>
                </div>
                { user?.username === currentUser.username ? (
                  ""
                ) : (
                  <FollowButton
                  {...user}
                  
                  
                  onClick={() => handleRemoveFollower(user?._id)}
                  className="text-xs bg-sky-500 px-2 rounded-xl text-sky-100 py-1"
                />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Followers;
