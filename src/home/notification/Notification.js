import { useEffect, useCallback } from "react";
// import { socket } from "../../config/socket.io";
import avatar from "../../assets/man.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotification,
  selectNotifications,
  setNotifications,
} from "../../redux/services/notificationSlice";
import { makeRequest } from "../../config/api.config";
import { AngleLeft } from "../../icons";
import { followUser } from "../../redux/services/suggetionSlice";
import { sendNotification } from "../services/notifications";
// import { sendFriendRequest } from "../../profile/services/postServices";
const Notification = ({ setClose }) => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
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

  // useEffect(() => {
  //   socket.on("sendNotification", (data) => {
  //     if (data) {
  //       dispatch(addNotification(data));
  //     }
  //   });
  // }, [dispatch]);

  // const followBack = async (userId) => {
  //   const data = await sendFriendRequest(userId);
  //   console.log(data)

  //   if (data.isSuccess) {
  //     dispatch(followUser(userId));
  //     await sendNotification({
  //       postId: null,
  //       from: userId,
  //       to: data.targetUser?._id,
  //       content: `${data?.user?._id} started following you`,
  //       notificationType: "Following",
  //     });
  //   }
  // };
  return (
    <div className="fixed bg-white dark:bg-slate-900 border-l-2 bottom-0 -top-4 -right-4  h-screen w-96 overflow-y-scroll lg:block hidden">
      <div className="p-4 flex justify-between">
        <h1 className="text-2xl font-semibold dark:text-gray-50 flex items-center gap-4">
          <button className="text-2xl" onClick={setClose}>
            <AngleLeft />
          </button>{" "}
          Notifications
        </h1>
      </div>
      <ul className="p-2 flex flex-col gap-2">
        {notifications?.map((n) => (
          <li className="p-2 dark:bg-slate-700 dark:text-gray-50  flex justify-between gap-4 items-center rounded-md">
            <span>
              <img
                src={n.from.profilePicture || avatar}
                alt=""
                className="w-10 h-10 rounded-full "
              />
            </span>
            <span className="flex-1">{n.content}</span>
            {n?.postId ? (
              <a href={`/home#${n?.postId?._id}`}>
                <img
                  src={n?.postId?.imageUrl}
                  alt=""
                  className="w-10 h-10 rounded "
                />
              </a>
            ) : (
              <button
                className="text-xs bg-sky-500 px-2 rounded-xl text-sky-100 py-1"
                // onClick={() => followBack(n?.userId)}
              >
                Follow Back
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
