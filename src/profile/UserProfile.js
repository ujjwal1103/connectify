import { formatNumberWithKAndM } from "../utils/number-formaters";
import { makeRequest } from "../config/api.config";
import Posts from "./components/Posts";
import blackUser from "../assets/no_avatar.png";
import { useParams } from "react-router-dom";
import { sendFriendRequest } from "./services/postServices";
import Followers from "./components/Followers";
import Following from "./components/Following";
import { useState, useEffect, useCallback } from "react";

const UserProfile = () => {
  const [user, setUser] = useState("");
  const { user: currUser } = JSON.parse(localStorage.getItem("user"));
  const [show, setShow] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const { username } = useParams();

  const getUser = useCallback(async () => {
    const response = await makeRequest(`/user/${username}`);
    setUser(response.data.user);
  }, [username]);

  const handleFollowRequest = async () => {
    const data = await sendFriendRequest(user?._id);

    if (data.isSuccess) {
      const newUser = (user.isFollowed = true);
      setUser(newUser);
    }
  };

  const toggleShow = () => {
    if (user?.followers.length > 0) {
      setShow((prev) => !prev);
    }
  };
  const toggleShowFollowing = () => {
    if (user?.following.length > 0) {
      setShowFollowing((prev) => !prev);
    }
  };

  const handleUnfollow = async () => {
    // const data = await sendFriendRequest(user?._id);
    // if (data.isSuccess) {
    //   const newUser = (user.isFollowed = true);
    //   setUser(newUser);
    // }
  };

  const handleSendMessage = async () => {
    try {
      const response = await makeRequest.post('/chat', {to: user._id})
      console.log(response);
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
      <div className="lg:w-2/3 w-full flex-col lg:mx-auto flex justify-center lg:justify-start items-center lg:p-3">
        <div className="lg:mt-10 p-3 border-black flex flex-col lg:flex-row lg:gap-10 dark:bg-gray-800 rounded-lg lg:mb-2  dark:text-slate-100   dark:bg-gradient-to-r  dark:from-slate-950 dark:to-gray-900 shadow-lg">
          <div className="h-44 w-44 mx-auto">
            <img
              src={user?.profilePicture || blackUser}
              alt=""
              className="h-44 w-44 object-cover rounded-full border"
            />
          </div>
          <div className="p-3">
            <div className="pt-6 flex gap-10 items-center lg:flex-row flex-col">
              <span className="text-2xl">{user?.username}</span>
              {user?.isFollowed || user.followers.includes(currUser._id) ? (
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
              {user?.isFollowed ||
                (user.followers.includes(currUser._id) && (
                  <button
                    onClick={handleSendMessage}
                    className="text-2xl border p-2 lg:w-52 border-slate-600/30  text-violet-800  dark:text-slate-100   dark:bg-gradient-to-r  dark:from-slate-950 dark:to-gray-900 font-semibold rounded-md"
                  >
                    Send Message
                  </button>
                ))}
            </div>
            <div className="flex pt-6 justify-between">
              <div className="flex flex-col justify-center items-center">
                <span className="text-2xl">{user?.posts?.length}</span>
                <span>Posts</span>
              </div>
              <div
                className="flex flex-col justify-center items-center"
                onClick={toggleShow}
              >
                <span className="text-2xl">{user?.followers.length}</span>
                <span>Followers</span>
              </div>
              <div
                className="flex flex-col justify-center items-center"
                onClick={toggleShowFollowing}
              >
                <span className="text-2xl">
                  {user && formatNumberWithKAndM(user?.following.length)}
                </span>
                <span>Following</span>
              </div>
            </div>
          </div>
        </div>
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
