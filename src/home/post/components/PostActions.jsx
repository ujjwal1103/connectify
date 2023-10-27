import { BsChat, BsHeart, BsHeartFill, BsSend } from "react-icons/bs";
import Save from "../../../icons/Save";
import { makeRequest } from "../../../config/api.config";
import { useDispatch } from "react-redux";
import {
  likePost as likeCurrentPost,
  unlikePost as dislikeCurrentPost,
} from "../../../redux/services/feedSlice";
import { sendNotification } from "../../services/notifications";

const PostActions = ({ post, userId, username, showCurrentPost }) => {
  const dispatch = useDispatch();

  const likePost = async () => {
    const res = await makeRequest.put(`/like/${post._id}`);
    if (res?.data?.isSuccess) {
      dispatch(likeCurrentPost({ postId: post._id, userId }));
      if (userId !== post?.userId._id) {
        await sendNotification({
          postId: post?._id,
          from: userId,
          to: post?.userId._id,
          content: `${username} liked your post`,
          notificationType: "Post_Liked",
        });
      }
    }
  };

  const dislikePost = async () => {
    const res = await makeRequest.put(`/dislike/${post._id}`);
    if (res?.data?.isSuccess) {
      dispatch(dislikeCurrentPost({ postId: post._id, userId }));
    }
  };

  return (
    <div className="flex justify-between items-center p-3">
      <div className="flex items-center gap-5">
        {post?.isLiked || post?.likedBy?.includes(userId) ? (
          <BsHeartFill
            size={24}
            className="text-red-600"
            onClick={dislikePost}
          />
        ) : (
          <BsHeart
            size={24}
            className="hover:text-gray-600 dark:text-gray-50"
            onClick={likePost}
          />
        )}
        <BsChat
          size={24}
          className="hover:text-gray-600 dark:text-gray-50"
          onClick={showCurrentPost}
        />
        <BsSend size={24} className="hover:text-gray-600 dark:text-gray-50" />
      </div>
      <Save
        size={24}
        fill={true}
        className="hover:text-gray-600 dark:text-gray-50"
      />
    </div>
  );
};

export default PostActions;
