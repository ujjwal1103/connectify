import { makeRequest } from "../config/api.config";
import Posts from "./components/Posts";
import { useNavigate, useParams } from "react-router-dom";
import {
  followUser,
  unfollowUser,
  sentFriendRequest,
  cancelFollowRequest,
} from "./services/postServices";

import { useEffect, useCallback, useState } from "react";
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
import useAleart from "../utils/hooks/useAleart";
import { ACCEPT_REQUEST } from "../utils/constant";
import useSocketEvents from "../hooks/useSocketEvents";
import { useSocket } from "../context/SocketContext";

const UserProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { otherUser: user, loading, error } = useSelector(profileState);
  const { alert } = useAleart();
  const { socket } = useSocket();
  const getUser = useCallback(async () => {
    try {
      const response = await makeRequest(`/user/${username}`);
      if (response.isSuccess) dispatch(setOtherUser(response.user));
    } catch (error) {
      dispatch(setError(error));
    }
  }, [dispatch, username]);

  const handleFollowRequest = async () => {
    if (user?.isPrivate && !user?.isFollow) {
      dispatch(
        setOtherUser({
          ...user,
          isRequested: true,
        })
      );
      const res = await sentFriendRequest(user?._id);
      if (res.requested) {
        alert("Friend Request Sent Successfully");
      }
      return;
    }
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
      alert(`You are now following ${username}`);
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
      if (response.isSuccess) {
        dispatch(addChat(response.chat));
        navigate(`/messenger/${response.chat._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSentFriendRequest = async (e) => {
    const res = await cancelFollowRequest(user?._id);
    dispatch(
      setOtherUser({
        ...user,
        isRequested: false,
      })
    );
  };

  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleRefech = useCallback(() => {
    getUser();
  }, []);

  const eventHandlers = {
    [ACCEPT_REQUEST]: handleRefech,
  };

  useSocketEvents(socket, eventHandlers);

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
      <div className="w-full lg:min-w-[350px] lg:max-w-[350px] lg:sticky top-0">
        <ProfileCard user={user} canOpen={user?.isPrivate && !user?.isFollow}>
          <div className="flex gap-5 py-2 justify-center items-center">
            {user?.isFollow && !user?.isRequested ? (
              <button
                onClick={handleUnfollow}
                className=" p-2 rounded-xl ring  ring-blue-600 hover:bg-zinc-800 transition-colors delay-200"
              >
                Following
              </button>
            ) : (
              !user?.isRequested && (
                <button
                  onClick={handleFollowRequest}
                  className=" p-2 rounded-xl  w-24 bg-blue-600 hover:bg-blue-800 transition-colors delay-200"
                >
                  Follow
                </button>
              )
            )}
            {user?.isFollow && (
              <button
                onClick={handleSendMessage}
                className=" p-2 rounded-xl ring  ring-blue-600  bg-blue-600 hover:bg-blue-800 hover:ring-blue-800 transition-colors delay-200"
              >
                Message
              </button>
            )}
            {user?.isRequested && (
              <button
                value="requestId"
                onClick={deleteSentFriendRequest}
                className=" p-2 rounded-xl bg-zinc-950 hover:bg-zinc-800  transition-colors delay-200"
              >
                Requested
              </button>
            )}
          </div>
        </ProfileCard>
      </div>

      {user?.isPrivate && !user?.isFollow ? (
        <PrivateUser />
      ) : (
        <Posts userId={user?._id} username={username} postCount={user?.posts} />
      )}
    </div>
  );
};

export default UserProfile;

const PrivateUser = ({}) => {
  return (
    <div className="lg:flex-1 w-full border border-white h-52  rounded-xl grid place-content-center">
      <div className="flex flex-col gap-5 text-center">
        <span>This Account is Private</span>
        <span>Follow to see their photos and videos.</span>
      </div>
    </div>
  );
};
