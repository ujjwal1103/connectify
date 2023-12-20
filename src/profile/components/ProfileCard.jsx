import React, { useState } from "react";
import { formatNumberWithKAndM } from "../../utils/number-formaters";
import Following from "./Following";
import Tabs from "./Tabs";
import Followers from "./Followers";
import ProfilePicture from "../../common/ProfilePicture";

const ProfileCard = ({ user, children }) => {
  const [show, setShow] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const toggleShow = () => {
    if (user?.followers > 0) {
      setShow((prev) => !prev);
    }
  };
  const toggleShowFollowing = () => {
    if (user?.following > 0) {
      setShowFollowing((prev) => !prev);
    }
  };
  return (
    <div className="lg:w-2/3 w-full flex-col lg:mx-auto flex justify-center lg:justify-start items-center lg:p-3">
      <div className="lg:mt-10 p-3 border-black flex flex-col lg:flex-row lg:gap-10 dark:bg-gray-800 rounded-lg lg:mb-2  dark:text-slate-100   dark:bg-gradient-to-r  dark:from-slate-950 dark:to-gray-900 shadow-lg">
        <div className="h-44 w-44 mx-auto">
          <ProfilePicture
            url={user?.profilePicture}
            className="h-44 w-44 object-cover rounded-full shadow-sm"
          />
        </div>
        <div className="p-3">
          <div className="pt-6 flex gap-10 items-center lg:flex-row flex-col">
            <span className="text-2xl">{user?.username}</span>
            {children}
          </div>
          <div className="flex pt-6 justify-between w-80 lg:w-auto">
            <div className="flex flex-col justify-center items-center">
              <span className="text-2xl">{user?.posts || 0}</span>
              <span>Posts</span>
            </div>
            <div
              className="flex flex-col justify-center items-center cursor-pointer group"
              onClick={toggleShow}
            >
              <span className="text-2xl group-hover:text-blue-500">
                {user?.followers || 0}
              </span>
              <span class="group-hover:text-blue-500 transition-all">
                Followers
              </span>
            </div>
            <div
              className="flex flex-col justify-center items-center cursor-pointer group"
              onClick={toggleShowFollowing}
            >
              <span className="text-2xl group-hover:text-blue-500">
                {user && formatNumberWithKAndM(user?.following || 0)}
              </span>
              <span class="group-hover:text-blue-500 transition-all">
                Following
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-14 py-4 overflow-hidden">
        <strong className="py-2">{user?.name}</strong>
        <pre className="text-xs leading-8 lg:leading-10 lg:text-sm ">
          {user?.bio}
        </pre>
      </div>
      {show && <Followers userId={user._id} setClose={toggleShow} />}
      {showFollowing && (
        <Following userId={user._id} setClose={toggleShowFollowing} />
      )}

      {(showFollowing || show) && (
        <Tabs
          userId={user._id}
          username={user.username}
          setClose={() => {
            setShowFollowing(false);
            setShow(false);
          }}
          tab={showFollowing ? "Following" : "Followers"}
        />
      )}
    </div>
  );
};

export default ProfileCard;
