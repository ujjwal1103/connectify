import { useEffect, useCallback } from "react";
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

const Notification = ({ setClose, onClose }) => {
  const dispatch = useDispatch();
  const notifications = [...data];
  const getAllNotifications = useCallback(async () => {
    try {
      const res = await makeRequest.get("notifications");

      if (res.data.isSuccess) {
        dispatch(setNotifications(res.data.notifications));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getAllNotifications();
  }, [getAllNotifications]);

  return (
    <motion.div
      className=" bg-transparent
      h-screen w-screen hidden lg:flex justify-end"
    >
      <div className="flex-1" onClick={onClose} />
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        exit={{ x: 500 }}
        className="w-96 dark:bg-zinc-900  overflow-y-scroll border-l-2 bottom-0 h-full"
      >
        <div className="p-4 pb-2 flex justify-between">
          <h1 className="text-2xl font-semibold dark:text-gray-50 flex items-center gap-4">
            <button className="text-2xl" onClick={setClose}>
              <AngleLeft />
            </button>
            Notifications
          </h1>
        </div>
        <ul className="p-2 flex flex-col gap-2 text-white">
          {notifications?.map((n) => (
            <>
              <Noti n={n} />
            </>
          ))}
        </ul>
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
    type: "FOLLOW_RESQUEST",
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
          <span className="flex-1 text-xs">{n.text}</span>
          {n.following && (
            <button className="text-[10px] px-2 text-sky-100 py-1 border rounded-md">
              Following
            </button>
          )}
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
          <span className="flex-1 text-xs">{n.text}</span>
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
