import React, { useState } from "react";
import { followUser, unfollowUser } from "../../profile/services/postServices";
import { isCurrentUser } from "../../utils/getCurrentUserId";
import Button from "../Components/Button";

const FollowBtn = ({
  userId,
  callBack = () => {},
  isFollow,
  showRemoveFollowerBtn,
  isRequested,
  isPrivate,
}) => {
  const [follow, setFollow] = useState(isFollow);
  const [isRequestSent, setIsRequestSent] = useState(isRequested);

  const handleFollowRequest = async () => {
    if (isPrivate) {
      //send friend request
      setIsRequestSent(true)
    } else {
      const data = await followUser(userId);
      if (data.follow) {
        setFollow(data.follow);
        callBack(data);
      }
    }
  };

  const handleUnfollow = async () => {
    if (!follow) return;
    const data = await unfollowUser(userId);
    if (data.unfollow) {
      setFollow(false);
      callBack(data);
    }
  };

  if (isCurrentUser(userId)) {
    return <span></span>;
  }

  if (showRemoveFollowerBtn) {
    return (
      <Button
        className="text-xs bg-gradient-to-l from-blue-900 to-violet-900 px-2 rounded-xl text-sky-100 py-1"
        onClick={handleUnfollow}
        size={"small"}
      >
        Remove
      </Button>
    );
  }
  if (isRequestSent) {
    return (
      <Button
        className="text-xs bg-gradient-to-l bg-zinc-900 px-2 rounded-xl text-sky-100 py-1"
        onClick={handleUnfollow}
        size={"small"}
      >
        Requested
      </Button>
    );
  }

  if (follow) {
    return (
      <Button
        className="text-xs bg-gradient-to-l from-blue-900 to-violet-900 px-2 rounded-xl text-sky-100 py-1"
        onClick={handleUnfollow}
        size={"small"}
      >
        Following
      </Button>
    );
  }

  return (
    <Button
      className="text-xs bg-gradient-to-l from-violet-900 to-blue-900 px-2 rounded-xl text-sky-100 py-1 "
      onClick={handleFollowRequest}
      size={"small"}
    >
      Follow
    </Button>
  );
};

export default FollowBtn;
