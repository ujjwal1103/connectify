import { Link } from "react-router-dom";
import avatar from "../../assets/man.png";
import { sendFriendRequest } from "../../profile/services/postServices";
import { useDispatch } from "react-redux";
import { followUser } from "../../redux/services/suggetionSlice";
import { sendNotification } from "../services/notifications";

const Suggetion = ({ user, username, userId }) => {
  const dispatch = useDispatch();

  const handleFollowRequest = async () => {
    const data = await sendFriendRequest(user?._id);

    if (data.isSuccess) {
      dispatch(followUser(user?._id));
      await sendNotification({
        postId: null,
        from: userId,
        to: user?._id,
        content: `${username} started following you`,
        notificationType: "Following",
      });
    }
  };

  return (
    <div className="">
      <div className="flex items-center dark:bg-slate-800 justify-between space-x-2 hover:scale-90 duration-500 bg-slate-50 shadow-lg m-2 p-2 rounded-lg w-80 mx-auto">
        <div className="flex items-center space-x-2">
          <img
            className="inline-block h-12 w-12 rounded-full hover:scale-90 duration-500 object-cover"
            src={user?.profilePicture || avatar}
            alt={user?.username}
          />
          <Link to={`/profile/${user?.username}`} className="flex flex-col">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
              {user?.name}
            </span>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {user?.username}
            </span>
          </Link>
        </div>
        {user?.isFollowed ? (
          <button className="text-xs bg-sky-500 px-2 rounded-xl text-sky-100 py-1">
            Following
          </button>
        ) : (
          <button
            className="text-xs bg-sky-500 px-2 rounded-xl text-sky-100 py-1"
            onClick={handleFollowRequest}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default Suggetion;
