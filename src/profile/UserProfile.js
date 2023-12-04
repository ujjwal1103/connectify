import { makeRequest } from "../config/api.config";
import Posts from "./components/Posts";
import { useParams } from "react-router-dom";
import { sendFriendRequest, unfollowUser } from "./services/postServices";
import Followers from "./components/Followers";
import Following from "./components/Following";
import { useState, useEffect, useCallback } from "react";
import ProfileCard from "./components/ProfileCard";

const UserProfile = () => {
  const [user, setUser] = useState("");
  const [show, setShow] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const { username } = useParams();

  const getUser = useCallback(async () => {
    try {
      const response = await makeRequest(`/user/${username}`);
      setUser(response?.user);
    } catch (error) {
      console.log(error.toString());
    }
  }, [username]);

  const handleFollowRequest = async () => {
    setUser((user) => ({
      ...user,
      isFollowed: true,
      followers: Number(user.followers) + 1,
    }));
    const data = await sendFriendRequest(user?._id);
    if (data.isSuccess) {
      setUser((user) => ({
        ...user,
        isFollowed: true,
      }));
    }
  };

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

  const handleUnfollow = async () => {
    setUser((user) => ({
      ...user,
      isFollowed: false,
      followers: Number(user.followers) - 1,
    }));
    const data = await unfollowUser(user?._id);
    if (data.isSuccess) {
      setUser((user) => ({ ...user, isFollowed: false }));
    } else {
      setUser((user) => ({
        ...user,
        isFollowed: true,
        followers: Number(user.followers) + 1,
      }));
    }
  };

  const handleSendMessage = async () => {
    try {
      const response = await makeRequest.post("/chat", { to: user._id });
      if (response.isSucess) {
        // TODO document why this block is empty
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (!user) {
    return <div>loading</div>;
  }

  return (
    <div
      className=" 
  bg-gray-100 h-full w-full  dark:text-gray-50 dark:bg-gradient-to-r p-2 dark:from-slate-900 dark:to-slate-950"
    >
      <div className="lg:w-2/3  w-full flex-col lg:mx-auto flex justify-center lg:justify-start items-center lg:p-3">
        <ProfileCard user={user}>
          {user?.isFollowed ? (
            <button
              onClick={handleUnfollow}
              className="text-2xl border p-2 lg:w-40 border-slate-600/30  text-violet-800  dark:text-slate-100   dark:bg-gradient-to-r  dark:from-slate-950 dark:to-gray-900 font-semibold rounded-md"
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={handleFollowRequest}
              className="text-2xl border p-2 lg:w-40 border-slate-600/30  text-violet-800  dark:text-slate-100   dark:bg-gradient-to-r  dark:from-slate-950 dark:to-gray-900 font-semibold rounded-md"
            >
              Follow
            </button>
          )}
          {user?.isFollowed && (
            <button
              onClick={handleSendMessage}
              className="text-2xl border p-2 lg:w-52 border-slate-600/30  text-violet-800  dark:text-slate-100   dark:bg-gradient-to-r  dark:from-slate-950 dark:to-gray-900 font-semibold rounded-md"
            >
              Send Message
            </button>
          )}
        </ProfileCard>
        <div className="">
          <strong>{user?.name}</strong>
          <pre>{user?.bio}</pre>
        </div>
      </div>

      <hr className="h-1 bg-violet-100" />

      <Posts userId={user?._id} />
      {show && <Followers userId={user._id} setClose={toggleShow} />}
      {showFollowing && (
        <Following userId={user._id} setClose={toggleShowFollowing} />
      )}
    </div>
  );
};

export default UserProfile;
