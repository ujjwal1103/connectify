import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfilePicture from "../../common/ProfilePicture";
import { makeRequest } from "../../config/api.config";
import { AngleLeft } from "../../icons";
import {
  setNotifications
} from "../../redux/services/notificationSlice";

import moment from "moment";
import { useSocket } from "../../context/SocketContext";
import useSocketEvents from "../../hooks/useSocketEvents";
import { ImageComponent } from "../../profile/components/Post";
import FollowBtn from "../../shared/Buttons/FollowBtn";
import UsernameLink from "../../shared/UsernameLink";
import { tranformUrl } from "../../utils";
import { LIKE_POST, NEW_REQUEST } from "../../utils/constant";

const Notification = ({ setClose, onClose }) => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notifications);
  const [showFollowRequests, setShowFollowRequest] = useState();
  const { socket } = useSocket();
  const getAllNotifications = useCallback(async () => {
    try {
      const res = await makeRequest.get("notifications");

      if (res.isSuccess) {
        dispatch(setNotifications(res.notifications));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getAllNotifications();
  }, [getAllNotifications]);

  const [request, setRequest] = useState([]);

  const getAllFollowRequestForUser = useCallback(async () => {
    const res = await makeRequest("/followRequests");
    setRequest(res?.followRequest || []);
  }, []);

  useEffect(() => {
    getAllFollowRequestForUser();
  }, [getAllFollowRequestForUser]);

  const handleAccept = async (requestId, accept) => {
    if (accept) {
      await makeRequest.patch(`/accept/${requestId}`);
      getAllFollowRequestForUser();
      getAllNotifications();
      return;
    }
  };

  const handleRequest = useCallback((data) => {
    getAllFollowRequestForUser();
    getAllNotifications();
  }, [getAllFollowRequestForUser, getAllNotifications]);

  const eventHandlers = {
    [NEW_REQUEST]: handleRequest,
    [LIKE_POST]: handleRequest,
  };

  useSocketEvents(socket, eventHandlers);

  return (
    <motion.div
      className=" bg-transparent
      h-screen w-screen flex lg:flex justify-end"
    >
      <div className="lg:flex-1 hidden lg:block " onClick={onClose} />
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        exit={{ x: 500 }}
        className="w-96 dark:bg-zinc-900 bg-white  overflow-y-scroll lg:border-l-2 bottom-0 h-full"
      >
        {!showFollowRequests && (
          <>
            <div className="p-4 pb-2 flex justify-between">
              <h1 className="text-2xl font-semibold dark:text-gray-50 flex items-center gap-4">
                <button className="text-2xl" onClick={setClose}>
                  <AngleLeft />
                </button>
                Notifications
              </h1>
            </div>
            {!!request.length && (
              <div className="px-4">
                <button
                  onClick={() => setShowFollowRequest(true)}
                  className="dark:text-white"
                >
                  Follow Requests ({request.length})
                </button>
              </div>
            )}
            <ul className="p-2 flex flex-col gap-2 text-white">
              {notifications?.map((n) => (
                <>
                  <Noti n={n} handleAccept={handleAccept} />
                </>
              ))}
            </ul>
          </>
        )}
        {showFollowRequests && (
          <>
            <div className="p-4 pb-2 flex justify-between">
              <h1 className="text-2xl font-semibold dark:text-gray-50 flex items-center gap-4">
                <button
                  className="text-2xl"
                  onClick={() => setShowFollowRequest(false)}
                >
                  <AngleLeft />
                </button>
                Follow Request
              </h1>
            </div>
            <ul className="p-2 flex flex-col gap-2 text-white">
              {request?.map((n) => (
                <>
                  <li className="flex items-center gap-4">
                    <ProfilePicture
                      src={n.requestedBy.avatar}
                      className={"size-9 rounded-full"}
                    />
                    <UsernameLink
                      onClick={() => {
                        onClose();
                      }}
                      className="flex-1"
                      username={n.requestedBy.username}
                    />
                    <div className="flex gap-3">
                      <button
                        className="text-xs bg-blue-600 px-2 rounded-xl text-sky-100 py-1"
                        onClick={() => handleAccept(n._id, true)}
                      >
                        Accept
                      </button>
                      <button
                        className="text-xs text-red-600 bg-zinc-950 px-2 rounded-xl  py-1"
                        onClick={() => handleAccept(n._id, false)}
                      >
                        Decline
                      </button>
                    </div>
                  </li>
                </>
              ))}
            </ul>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Notification;

export const data = [
  {
    type: "POST_LIKE",
    postId: "2839820482742847387482738472",
    following: true,
    incomingRequest: false,
    from: {
      username: "ujjwal_lade",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/connectify-29152.appspot.com/o/posts%2Fimage.png?alt=media&amp;token=20351c46-4db1-44bb-b8bb-f3c6a5b8ffee",
    },
    text: "ujjwal_lade liked your post",
    postImageUrl:
      "https://firebasestorage.googleapis.com/v0/b/connectify-29152.appspot.com/o/posts%2Fimage.png?alt=media&amp;token=20351c46-4db1-44bb-b8bb-f3c6a5b8ffee",
  },
  {
    type: "FOLLOW_RESQUEST_SENT",
    requestId: "2839820482742847387482738472",
    from: {
      username: "ujjwal_lade",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/connectify-29152.appspot.com/o/posts%2Fimage.png?alt=media&amp;token=20351c46-4db1-44bb-b8bb-f3c6a5b8ffee",
    },
    actionBy: "username",
    text: "ujjwal_lade Requested to follow you",
    following: true,
    fromProfileUrl:
      "https://firebasestorage.googleapis.com/v0/b/connectify-29152.appspot.com/o/posts%2Fimage.png?alt=media&amp;token=20351c46-4db1-44bb-b8bb-f3c6a5b8ffee",
  },
  {
    type: "FOLLOW_REQUEST_ACCEPTED",
    actionBy: "username",
    from: {
      username: "ujjwal_lade",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/connectify-29152.appspot.com/o/posts%2Fimage.png?alt=media&amp;token=20351c46-4db1-44bb-b8bb-f3c6a5b8ffee",
    },
    text: "ujjwal_lade accept your follow request",
    following: true,
    fromProfileUrl:
      "https://firebasestorage.googleapis.com/v0/b/connectify-29152.appspot.com/o/posts%2Fimage.png?alt=media&amp;token=20351c46-4db1-44bb-b8bb-f3c6a5b8ffee",
  },
  {
    type: "FOLLOW_REQUEST_ACCEPTED",
    actionBy: "username",
    incomingRequest: true,
    from: {
      username: "ujjwal_lade",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/connectify-29152.appspot.com/o/posts%2Fimage.png?alt=media&amp;token=20351c46-4db1-44bb-b8bb-f3c6a5b8ffee",
    },
    text: "ujjwal_lade accept your follow request",
    following: true,
    fromProfileUrl:
      "https://firebasestorage.googleapis.com/v0/b/connectify-29152.appspot.com/o/posts%2Fimage.png?alt=media&amp;token=20351c46-4db1-44bb-b8bb-f3c6a5b8ffee",
  },
];

const Noti = ({ n, handleAccept }) => {
  switch (n.type) {
    case "FOLLOW_REQUEST_ACCEPTED": {
      return (
        <li
          key={n.postId}
          className=" dark:text-gray-50  flex justify-between gap-4 items-center rounded-md"
        >
          <ProfilePicture
            src={n.from.avatar}
            className={"size-8 rounded-full object-cover"}
          />
          <NotificationText text={n.text} username={n.from.username} date={n.createdAt} />

          <FollowBtn isFollow={n.from.isFollow} userId={n.from._id} />
        </li>
      );
    }
    case "FOLLOWING": {
      return (
        <li
          key={n.postId}
          className=" dark:text-gray-50  flex justify-between gap-4 items-center rounded-md"
        >
          <ProfilePicture
            src={n.from.avatar}
            className={"size-8 rounded-full object-cover"}
          />
          <NotificationText text={n.text} username={n.from.username} date={n.createdAt} />
          <FollowBtn isFollow={n.from.isFollow} userId={n.from._id} />
        </li>
      );
    }
    case "LIKE_POST": {
      return (
        <li
          key={n.postId}
          className=" dark:text-gray-50  flex justify-between gap-4 items-center rounded-md"
        >
          <ProfilePicture
            src={n.from.avatar}
            className={"size-8 rounded-full object-cover"}
          />
          <NotificationText text={n.text} username={n.from.username} date={n.createdAt} />

          <div>
            <ImageComponent
              key={n.postId.imageUrl}
              src={tranformUrl(n.postId.imageUrl[0])}
              alt={n.postId.imageUrl[0]}
              loaderClassName={`bg-zinc-950 animate-pulse size-10 bg-red-400`}
              className={"size-10 object-cover"}
            />
          </div>
        </li>
      );
    }
    default: {
      return (
        <li
          key={n.postId}
          className=" dark:text-gray-50  flex justify-between gap-4 items-center rounded-md"
        >
          <ProfilePicture
            src={n.from.avatar}
            className={"size-8 rounded-full object-cover"}
          />
          <NotificationText text={n.text} username={n.from.username} date={n.createdAt} />
          <button
            className="text-xs  px-2 rounded-xl text-sky-100 py-1"
            onClick={() => handleAccept(n.requestId, true)}
          >
            Accept
          </button>
          <button
            className="text-xs text-red-600 px-2 rounded-xl  py-1"
            onClick={() => handleAccept(n.requestId, false)}
          >
            Decline
          </button>
        </li>
      );
    }
  }
};

function NotificationText({ text, username, date }) {
  return (
    <div className="flex-1">
      <p className=" text-xs leading-tight">
        <UsernameLink username={username} />
        <span> {text}</span>
      </p>
      <p className="text-[8px]">{moment(date).calendar()}</p>
    </div>
  );
}
