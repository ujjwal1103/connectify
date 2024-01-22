import { makeRequest } from "../config/api.config";
import Posts from "./components/Posts";
import { useNavigate, useParams } from "react-router-dom";
import { followUser, unfollowUser } from "./services/postServices";
import Followers from "./components/Followers";
import Following from "./components/Following";
import { useState, useEffect, useCallback } from "react";
import ProfileCard from "./components/ProfileCard";
import { useDispatch, useSelector } from "react-redux";
import { addChat } from "../redux/services/chatSlice";
import Loading from "../common/Loading";
import ProfilePicture from "../common/ProfilePicture";
import UserLoading from "./components/UserLoading";
import {
  profileState,
  setError,
  setOtherUser,
} from "../redux/services/profileSlice";
import PageNotFound from "../PageNotFound/PageNotFound";

const images = [
  "https://cdn.pixabay.com/photo/2023/10/30/17/34/flamingos-8353373_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/05/08/13/15/bird-2295431_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/05/08/13/15/bird-2295436_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/11/16/16/28/bird-1045954_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg",
  "https://cdn.pixabay.com/photo/2012/08/06/00/53/bridge-53769_1280.jpg",
  "https://cdn.pixabay.com/photo/2023/10/30/17/34/flamingos-8353373_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/05/08/13/15/bird-2295431_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/05/08/13/15/bird-2295436_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/11/16/16/28/bird-1045954_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg",
  "https://cdn.pixabay.com/photo/2012/08/06/00/53/bridge-53769_1280.jpg",
];

const UserProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { otherUser: user, loading, error } = useSelector(profileState);

  const getUser = useCallback(async () => {
    try {
      const response = await makeRequest(`/user/${username}`);
      if (response.isSuccess) dispatch(setOtherUser(response.user));
    } catch (error) {
      dispatch(setError(error));
    }
  }, [username]);

  const handleFollowRequest = async () => {
    dispatch(
      setOtherUser({
        ...user,
        isFollow: true,
        followers: Number(user.followers) + 1,
      })
    );
    const data = await followUser(user?._id);

    console.log("RESPONSE", data);
    if (data.follow) {
      dispatch(
        setOtherUser({
          ...user,
          isFollow: true,
        })
      );
    }
  };

  const handleUnfollow = async () => {
    dispatch(
      setOtherUser({
        ...user,
        isFollow: false,
        followers: Number(user.followers) - 1,
      })
    );
    const data = await unfollowUser(user?._id);
    console.log("RESPONSE", data);

    if (data.unfollow) {
      dispatch(setOtherUser({ ...user, isFollow: !data.unfollow }));
    } else {
      dispatch(
        setOtherUser({
          ...user,
          isFollow: true,
          followers: Number(user.followers) + 1,
        })
      );
    }
  };

  const handleSendMessage = async () => {
    try {
      const response = await makeRequest.post("/chat", { to: user._id });
      console.log(response.chat._id);
      if (response.isSuccess) {
        dispatch(addChat(response.chat));
        console.log(response.chat._id);
        navigate(`/messenger/${response.chat._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (loading) {
    return <UserLoading />;
  }

  if (error) {
    return <PageNotFound />;
  }

  return (
    <div
      className=" 
      w-full flex h-page px-4 pt-4 lg:flex-row flex-col gap-4 items-center lg:items-start "
    >
      <div className=" sticky top-2  w-[450px] flex-col lg:mx-auto flex justify-center  items-center ">
        <ProfileCard user={user}>
          <div className="flex gap-3 justify-center items-center">
            {user?.isFollow ? (
              <button
                onClick={handleUnfollow}
                className=" p-2 rounded-xl   bg-blue-600 hover:bg-blue-800 transition-colors delay-200"
              >
                Following
              </button>
            ) : (
              <button
                onClick={handleFollowRequest}
                className=" p-2 rounded-xl   bg-blue-600 hover:bg-blue-800 transition-colors delay-200"
              >
                Follow
              </button>
            )}
            {user?.isFollow && (
              <button
                onClick={handleSendMessage}
                className=" p-2 rounded-xl   bg-blue-600 hover:bg-blue-800 transition-colors delay-200"
              >
                Send Message
              </button>
            )}
          </div>
        </ProfileCard>
      </div>

      <Posts userId={user?._id} />
    </div>
  );
};

export default UserProfile;
