import { makeRequest } from "../../../config/api.config";
import { useDispatch } from "react-redux";
import {
  likePost as likeCurrentPost,
  unlikePost as dislikeCurrentPost,
} from "../../../redux/services/feedSlice";
import {
  BookMark,
  BookMarkFill, CommentIcon,
  Heart,
  HeartFill,
  Send
} from "../../../icons";

import { useCallback, useEffect, useState } from "react";
import { updateLike } from "../../../redux/services/postSlice";
import { IoClose } from "react-icons/io5";
import Modal from "../../../shared/Modal";
import { motion } from "framer-motion";
import ProfilePicture from "../../../common/ProfilePicture";
import { BiSend } from "react-icons/bi";
import { useDebounce } from "../../../utils/hooks/useDebounce";

const PostActions = ({ post, userId, showCurrentPost, size = 24, onLike }) => {
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [sendPost, setSendPost] = useState(false);
  const dispatch = useDispatch();

  const handleLikeClicked = async (isLike, error) => {
    if (error) {
      return;
    }

    if (onLike) {
      onLike(isLike);
      return;
    }
    dispatch(updateLike({ like: isLike, postId: post?._id }));

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
          postUserId={post?.user?._id}
        />
        <CommentIcon
          size={size}
          className="hover:text-gray-600 dark:text-gray-50 cursor-pointer"
          onClick={showCurrentPost}
        />
        <Send
          onClick={() => setSendPost(true)}
          size={size}
          className="hover:text-gray-600 dark:text-gray-50 cursor-pointer"
        />
      </div>
      {isBookMarked ? (
        <BookMarkFill
          className="cursor-pointer"
          size={size}
          onClick={() => setIsBookMarked(false)}
        />
      ) : (
        <BookMark
          className="cursor-pointer"
          size={size}
          color=""
          onClick={() => setIsBookMarked(true)}
        />
      )}

      {sendPost && (
        <Modal onClose={() => setSendPost(false)} showCloseButton={false}>
          <SendPost post={post} />
        </Modal>
      )}
    </div>
  );
};

export default PostActions;

export const LikeButton = ({
  size = 24,
  id,
  onLikeClick=()=>{},
  isLiked,
  postUserId,
  commentId
}) => {
  const handleLikeClicked = async (isLike) => {
    onLikeClick(isLike, false);
    try {
      if (isLike) {
        await makeRequest.post("/like", {
          postId: id,
          postUserId,
          commentId
        });
      } else {
        await makeRequest.delete(`/unLike?postId=${id}&commentId=${commentId}`);
      }
    } catch (error) {
      onLikeClick(isLike, true);
    }
  };

  if (isLiked) {
    return (
      <HeartFill
        size={size}
        className="text-red-600 cursor-pointer"
        onClick={() => handleLikeClicked(false)}
      />
    );
  }

  return (
    <Heart
      size={size}
      className="hover:text-gray-600 dark:text-gray-50 cursor-pointer"
      onClick={() => handleLikeClicked(true)}
    />
  );
};

export const SendPost = ({ post, onClose }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState();
  const debounceSearch = useDebounce(search, 400);

  const fetchUsers = useCallback(async () => {
    let url = "/users/send";
    if (debounceSearch) {
      url = url + `?search=${debounceSearch}`;
    }
    try {
      const res = await makeRequest(url);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  },[debounceSearch]);

  const handleSendPost = useCallback(async (userId) => {
    console.log(userId);
    const res = makeRequest.post("/message/u/send", {
      userId,
      post: post?._id,
      messageType: "POST_MESSAGE",
    });
    onClose();
  },[]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="dark:bg-zinc-900 bg-gray-50 w-[500px] h-[450px] dark:text-white rounded-xl overflow-hidden">
      <div className="flex-between p-3">
        <h1>Share</h1>
        <button onClick={onClose}>
          <IoClose size={24} />
        </button>
      </div>
      <hr />
      <div className="p-2 px-3 flex items-center ">
        <span>To:</span>
        <input
          className="p-2 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <hr />
      <div className="p-2 px-3 overflow-y-scroll h-[350px]">
        <h1 className="pb-2">Suggested</h1>
        <ul className="">
          {users?.map((user, index) => {
            return (
              <motion.li
                initial={{ opacity: 0, y: "-20%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                exit={{
                  opacity: 0,
                  y: "-20%",
                  animationDirection: "forward",
                  transition: { duration: 0.3, delay: 0 },
                }}
                className="py-2 flex gap-3 items-center"
              >
                <ProfilePicture
                  src={user.avatar}
                  className={"size-10 rounded-full"}
                />
                <span>{user.username}</span>
                <button
                  className="ml-auto"
                  onClick={() => handleSendPost(user._id)}
                >
                  <span className="">
                    <BiSend />
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
