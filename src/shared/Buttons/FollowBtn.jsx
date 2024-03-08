import React, { useState } from "react";
import { followUser, unfollowUser } from "../../profile/services/postServices";
import { isCurrentUser } from "../../utils/getCurrentUserId";
import Button from "../Components/Button";

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
    const data = await unfollowUser(userId);
    if (data.unfollow) {
      setFollow(false);
      callBack(data);
    }
    console.log(userId);
  };

  if (isCurrentUser(userId)) {
    return <span></span>;
  }

  if (follow) {
    return (
      <Button
        className="text-xs bg-gradient-to-l from-violet-900 to-blue-900 px-2 rounded-xl text-sky-100 py-1"
        onClick={handleUnfollow}
        size={"small"}
      >
        Following
      </Button>
    );
  }

  return (
    <Button
      className=" bg-gradient-to-l from-sky-900 to-indigo-900 px-2  text-sky-100 "
      onClick={handleFollowRequest}
      size={"small"}
    >
      Follow
    </Button>
  );
};

export default FollowBtn;
