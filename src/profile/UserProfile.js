import { makeRequest } from "../config/api.config";
import Posts from "./components/Posts";
import { useNavigate, useParams } from "react-router-dom";
import { followUser, unfollowUser } from "./services/postServices";

import { useEffect, useCallback } from "react";
import ProfileCard from "./components/ProfileCard";
import { useDispatch, useSelector } from "react-redux";
import { addChat } from "../redux/services/chatSlice";
import UserLoading from "./components/UserLoading";
import {
  profileState,
  setError,
  setOtherUser,
} from "../redux/services/profileSlice";
import PageNotFound from "../PageNotFound/PageNotFound";

// const images = [
//   "https://cdn.pixabay.com/photo/2023/10/30/17/34/flamingos-8353373_1280.jpg",
//   "https://cdn.pixabay.com/photo/2017/05/08/13/15/bird-2295431_1280.jpg",
//   "https://cdn.pixabay.com/photo/2017/05/08/13/15/bird-2295436_1280.jpg",
//   "https://cdn.pixabay.com/photo/2015/11/16/16/28/bird-1045954_1280.jpg",
//   "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg",
//   "https://cdn.pixabay.com/photo/2012/08/06/00/53/bridge-53769_1280.jpg",
//   "https://cdn.pixabay.com/photo/2023/10/30/17/34/flamingos-8353373_1280.jpg",
//   "https://cdn.pixabay.com/photo/2017/05/08/13/15/bird-2295431_1280.jpg",
//   "https://cdn.pixabay.com/photo/2017/05/08/13/15/bird-2295436_1280.jpg",
//   "https://cdn.pixabay.com/photo/2015/11/16/16/28/bird-1045954_1280.jpg",
//   "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg",
//   "https://cdn.pixabay.com/photo/2012/08/06/00/53/bridge-53769_1280.jpg",
// ];

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
  }, [dispatch, username]);

  const handleFollowRequest = async () => {
    dispatch(
      setOtherUser({
        ...user,
        isFollow: true,
        followers: Number(user.followers) + 1,
      })
    );
    const data = await followUser(user?._id);
    if (data.follow) {
      getUser();
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
    if (data.unfollow) {
      getUser();
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
      w-full flex lg:h-page overflow-y-scroll h-post  overflow-x-hidden bg-zinc-950 p-3 lg:flex-row flex-col gap-4 items-center  lg:items-start "
    >
      <div className=" lg:sticky top-0 left-0 lg:w-[400px] w-72 flex-col lg:mx-auto flex rounded-xl justify-center  items-center ">
        <ProfileCard user={user} canOpen={user?.isPrivate && !user?.isFollow}>
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
                className=" p-2 rounded-xl  w-24 bg-blue-600 hover:bg-blue-800 transition-colors delay-200"
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
          
      {(user?.isPrivate && !user?.isFollow) ? (
        <div className="lg:flex-1 w-full border border-white h-52  rounded-xl grid place-content-center">
          <div className="flex flex-col gap-5 text-center">
            <span>This Account is Private</span>
            <span>Follow to see their photos and videos.</span>
          </div>
        </div>
      ) : (
        <Posts userId={user?._id} />
      )}
    </div>
  );
};

export default UserProfile;
