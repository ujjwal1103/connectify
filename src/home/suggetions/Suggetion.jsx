import { Link } from "react-router-dom";

import ProfilePicture from "../../common/ProfilePicture";
import { useState } from "react";
import { followUser } from "../../profile/services/postServices";

const Suggetion = ({ user }) => {
  const { _id: userId, avatar, username, name, isPrivate } = user;
  const [follow, setFollow] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  const handleFollowRequest = async () => {
    if (isPrivate) {
      console.log("private user");
      setIsRequested(true);
      return;
    }
    const data = await followUser(userId);
    if (data.follow) {
      setFollow(data.follow);
    }
  };

  return (
    <div className="">
      <div className="flex items-center dark:bg-zinc-900 justify-between space-x-2  duration-500 bg-slate-50 shadow-lg m-2 p-2 rounded-lg w-80 mx-auto">
        <div className="flex items-center space-x-2">
          <ProfilePicture
            src={avatar}
            className="inline-block h-12 w-12 rounded-full hover:scale-90 duration-500 object-cover"
          />
          <Link to={`/${username}`} className="flex flex-col">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
              {name}
            </span>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {username}
            </span>
          </Link>
        </div>

        {isRequested && (
          <button className="text-xs bg-gradient-to-l from-violet-900 to-blue-900 px-2 rounded-xl text-sky-100 py-1">
            Requested
          </button>
        )}

        {follow ? (
          <button className="text-xs bg-gradient-to-l from-violet-900 to-blue-900 px-2 rounded-xl text-sky-100 py-1">
            Following
          </button>
        ) : (
          <button
            className="text-xs  bg-gradient-to-l from-sky-900 to-indigo-900 px-2 rounded-xl text-sky-100 py-1"
            onClick={handleFollowRequest}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default Suggetion;
