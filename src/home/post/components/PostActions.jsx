import { makeRequest } from "../../../config/api.config";
import { useDispatch } from "react-redux";
import {
  likePost as likeCurrentPost,
  unlikePost as dislikeCurrentPost,
} from "../../../redux/services/feedSlice";
import {
  BookMark,
  BookMarkFill,
  Chat,
  Heart,
  HeartFill,
  Send,
} from "../../../icons";
import { useSocket } from "../../../context/SocketContext";
import { sendNotification } from "../../notification/Services";
import { useState } from "react";

const PostActions = ({ post, userId, showCurrentPost, size = 24, onLike }) => {
  const [isBookMarked, setIsBookMarked] = useState(false);
  const dispatch = useDispatch();



  const handleLikeClicked = async (isLike, error) => {
    if (error) {
      return;
    }

    if(onLike){
      onLike(isLike)
      return;
    }
    if (isLike) {
      dispatch(likeCurrentPost({ postId: post._id, userId }));
    } else {
      dispatch(dislikeCurrentPost({ postId: post._id, userId }));
    }
  };

  return (
    <div className="flex justify-between items-center pt-2 px-2">
      <div className="flex items-center gap-3">
        <LikeButton
          isLiked={post?.isLiked}
          size={size}
          id={post?._id}
          onLikeClick={handleLikeClicked}
          postUserId={post.user._id}
        />
        <Chat
          size={size}
          className="hover:text-gray-600 dark:text-gray-50"
          onClick={showCurrentPost}
        />
        <Send size={size} className="hover:text-gray-600 dark:text-gray-50" />
      </div>
      {isBookMarked ? (
        <BookMarkFill size={size} onClick={() => setIsBookMarked(false)} />
      ) : (
        <BookMark size={size} color="" onClick={() => setIsBookMarked(true)} />
      )}
    </div>
  );
};

export default PostActions;

export const LikeButton = ({ size = 24, id, onLikeClick, isLiked,postUserId }) => {
  const handleLikeClicked = async (isLike) => {
    onLikeClick(isLike, false);
    try {
      if (isLike) {
        await makeRequest.post("/like", {
          postId: id,
          postUserId
        });
      } else {
        await makeRequest.delete(`/unLike?postId=${id}`);
      }
    } catch (error) {
      onLikeClick(isLike, true);
    }
  };

  if (isLiked) {
    return (
      <HeartFill
        size={size}
        className="text-red-600"
        onClick={() => handleLikeClicked(false)}
      />
    );
  }

  return (
    <Heart
      size={size}
      className="hover:text-gray-600 dark:text-gray-50"
      onClick={() => handleLikeClicked(true)}
    />
  );
};
