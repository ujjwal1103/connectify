import React, { useState } from "react";
import { followUser } from "../../profile/services/postServices";
import { isCurrentUser } from "../../utils/getCurrentUserId";

const FollowBtn = ({ userId, callBack, isFollow }) => {
  const [follow, setFollow] = useState(isFollow);

  const handleFollowRequest = async () => {
    const data = await followUser(userId);
    console.log("RESPONSE", data);
    if (data.follow) {
      setFollow(data.follow);
      callBack(data);
    }
  };

  const handleUnfollow = async () => {
    if (!follow) return;
  };

  if (isCurrentUser(userId)) {
    return <span></span>;
  }

  if (follow) {
    return (
      <button
        className="text-xs bg-gradient-to-l from-violet-900 to-blue-900 px-2 rounded-xl text-sky-100 py-1"
        onClick={handleUnfollow}
      >
        Following
      </button>
    );
  }

  return (
    <button
      className="text-xs  bg-gradient-to-l from-sky-900 to-indigo-900 px-2 rounded-xl text-sky-100 py-1"
      onClick={handleFollowRequest}
    >
      Follow
    </button>
  );
};

export default FollowBtn;
