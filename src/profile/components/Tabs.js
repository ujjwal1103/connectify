// Tabs.js
import React, { useState, useEffect } from "react";
import { makeRequest } from "../../config/api.config";
import avatar from "../../assets/man.png";
const Tabs = ({ userId, username, setClose, tab }) => {
  const [activeTab, setActiveTab] = useState(tab);
  const [followersData, setFollowersData] = useState([]);
  const [followingData, setFollowingData] = useState([]);

  const getFollowers = async () => {
    try {
      const { data } = await makeRequest.get(`/user/followers/${userId}`);
      if (data.isSuccess) {
        setFollowersData(data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getFollowings = async () => {
    try {
      const { data } = await makeRequest.get(`/user/following/${userId}`);
      if (data.isSuccess) {
        setFollowingData(data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (activeTab === "Followers") {
      getFollowers();
    }
    if (activeTab === "Following") {
      getFollowings();
    }
  }, [activeTab, userId]);

  return (
    <div className="w-screen h-screen lg:hidden bg-slate-950  fixed inset-0 overflow-hidden z-[999]">
      <div className="p-2 flex   ">
        <button className="text-sm absolute" onClick={setClose}>
          back
        </button>
        <h1 className="text-center flex-1">{username}</h1>
      </div>
      <div className="bg-slate-800 p-2 flex justify-between ">
        <button
          onClick={() => setActiveTab("Followers")}
          className={`${
            activeTab === "Followers" && "bg-gray-900"
          } flex-1 rounded-md py-2`}
        >
          Followers
        </button>
        <button
          onClick={() => setActiveTab("Following")}
          className={`${
            activeTab === "Following" && "bg-gray-900"
          } flex-1 rounded-md py-2`}
        >
          Following
        </button>
      </div>
      <div className="tab-content">
        {activeTab === "Followers" && (
          <ul>
            {followersData.map((follower) => (
              <li key={follower._id} className="flex gap-3 p-2 items-center">
                <div className="w-10 h-10 rounded-full overflow-clip">
                  <img
                    src={follower.profilePictur || avatar}
                    alt=""
                    className="w-10 h-10"
                  />
                </div>
                {follower.username}
              </li>
            ))}
          </ul>
        )}
        {activeTab === "Following" && (
          <ul>
            {followingData.map((following) => (
              <li key={following._id} className="flex gap-3 p-2 items-center">
                <div className="w-10 h-10 rounded-full overflow-clip">
                  <img
                    src={following.profilePicture || avatar}
                    alt=""
                    className="w-10 h-10"
                  />
                </div>
                {following.username}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Tabs;
