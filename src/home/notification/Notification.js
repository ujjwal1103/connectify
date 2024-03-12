import { useEffect, useCallback, useState } from "react";
import avatar from "../../assets/man.png";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNotifications,
  setNotifications,
} from "../../redux/services/notificationSlice";
import { makeRequest } from "../../config/api.config";
import { AngleLeft } from "../../icons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProfilePicture from "../../common/ProfilePicture";
import UserProfile from "../../profile/UserProfile";
import UsernameLink from "../../shared/UsernameLink";
import FollowBtn from "../../shared/Buttons/FollowBtn";

const Notification = ({ setClose, onClose }) => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notifications);
  const [showFollowRequests, setShowFollowRequest] = useState();
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

  const [request, setRequest] = useState();

  const getAllFollowRequestForUser = useCallback(async () => {
    const res = await makeRequest("/followRequests");
    console.log(res);
    setRequest(res?.followRequest || []);
  }, []);

  useEffect(() => {
    getAllFollowRequestForUser();
  }, []);

  const handleAccept = async (requestId, accept) => {
    if (accept) {
      const res = await makeRequest.patch(`/accept/${requestId}`);
      console.log(res);
      getAllFollowRequestForUser();
      return;
    }
  };

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
        className="w-96 dark:bg-zinc-900  overflow-y-scroll lg:border-l-2 bottom-0 h-full"
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
            <div className="px-4">
              <button
                onClick={() => setShowFollowRequest(true)}
                className="dark:text-white"
              >
                Follow Requests
              </button>
            </div>
            <ul className="p-2 flex flex-col gap-2 text-white">
              {notifications?.map((n) => (
                <>
                  <Noti n={n} />
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

const Noti = ({ n }) => {
  switch (n.type) {
    case "POST_LIKE": {
      return (
        <li
          key={n.postId}
          className=" dark:text-gray-50  flex justify-between gap-4 items-center rounded-md"
        >
          <ProfilePicture
            src={n.from.avatar}
            className={"size-8 rounded-full object-cover"}
          />
          <span className="flex-1 text-xs">{n.text}</span>

          <Link to={`/posts/${n?.postId}`}>
            <img
              src={n?.postImageUrl}
              alt=""
              className="size-8 object-cover "
            />
          </Link>
        </li>
      );
    }
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
          <p className="flex-1 text-xs leading-tight">
            <span>{n.from.username} </span>
            <span>{n.text}</span>
          </p>

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
          <p className="flex-1 text-xs leading-tight">
            <span>{n.from.username} </span>
            <span>{n.text}</span>
          </p>
          <FollowBtn isFollow={n.from.isFollow} userId={n.from._id} />
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
          <p className="flex-1 text-xs leading-tight">
            <span>{n.from.username} </span>
            <span>{n.text}</span>
          </p>
          <button className="text-xs  px-2 rounded-xl text-sky-100 py-1">
            Accept
          </button>
          <button className="text-xs text-red-600 px-2 rounded-xl  py-1">
            Decline
          </button>
        </li>
      );
    }
  }
};
