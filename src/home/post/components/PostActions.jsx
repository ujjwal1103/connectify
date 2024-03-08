import { makeRequest } from "../../../config/api.config";
import { useDispatch } from "react-redux";
import {
  likePost as likeCurrentPost,
  unlikePost as dislikeCurrentPost,
} from "../../../redux/services/feedSlice";
import { BookMark, BookMarkFill, Chat, Heart, HeartFill, Send } from "../../../icons";
import { useSocket } from "../../../context/SocketContext";
import { sendNotification } from "../../notification/Services";
import { useState } from "react";

const PostActions = ({ post, userId, showCurrentPost }) => {
  const [isBookMarked, setIsBookMarked] = useState(false);
  const dispatch = useDispatch();

  const { socket, isUserOnline } = useSocket();

  const likePost = async () => {
    try {
      dispatch(likeCurrentPost({ postId: post._id, userId }));
      await makeRequest.post("/like", {
        postId: post._id,
      });

      const isOnline = isUserOnline(post?.user?._id);

      if (isOnline) {
        await sendNotification(post?.user?._id, "Post Like", socket);
      } else {
        console.log("user is not online");
      }
    } catch (error) {
      dispatch(dislikeCurrentPost({ postId: post._id, userId }));
    }
  };
  const dislikePost = async () => {
    try {
      dispatch(dislikeCurrentPost({ postId: post._id, userId }));
      await makeRequest.delete(`/unLike`, {
        postId: post._id,
      });
    } catch (error) {
      dispatch(likeCurrentPost({ postId: post._id, userId }));
    }
  };
  return (
    <div className="flex justify-between items-center pt-3 px-2">
      <div className="flex items-center gap-3">
        {post?.isLiked ? (
          <HeartFill size={24} className="text-red-600" onClick={dislikePost} />
        ) : (
          <Heart
            size={24}
            className="hover:text-gray-600 dark:text-gray-50"
            onClick={likePost}
          />
        )}
        <Chat
          size={24}
          className="hover:text-gray-600 dark:text-gray-50"
          onClick={showCurrentPost}
        />
        <Send size={24} className="hover:text-gray-600 dark:text-gray-50" />
      </div>
      {isBookMarked ? (
        <BookMarkFill size={24} onClick={() => setIsBookMarked(false)} />
      ) : (
        <BookMark size={24} color="" onClick={() => setIsBookMarked(true)} />
      )}
    </div>
  );
};

export default PostActions;
