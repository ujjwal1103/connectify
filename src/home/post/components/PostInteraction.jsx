import { useState } from "react";
import { makeRequest } from "../../../config/api.config";
import { EmojiSmile } from "../../../icons";
import UsernameLink from "./../../../shared/UsernameLink";
import Modal from "../../../shared/Modal";
import Likes from "./Likes";

const PostInteraction = ({ post: { _id, user, like, caption } }) => {
  const [commentText, setCommentText] = useState(null);
  const [openLikes, setOpenLikes] = useState(false);
  const handleChange = (e) => {
    if (e.target.value.startsWith("@")) {
      console.log("show users");
    }
    setCommentText(e.target.value);
  };

  const sendComment = async () => {
    try {
      const { data } = await makeRequest.post(`/comment`, {
        post: _id,
        comment: commentText,
      });
      if (data.isSuccess) {
        setCommentText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col py-2  dark:text-gray-50">
      <button className="text-left" onClick={() => setOpenLikes(true)}>
        {like === 0 ? "" : `${like} ${like?.length === 1 ? "like" : "likes"}`}
      </button>

      <span className="line-clamp-2 dark:text-gray-50">
        <UsernameLink username={user.username} />
        <span className="px-2">
          {caption?.split(" ").map((word, index) => {
            if (word.startsWith("#")) {
              return (
                <span key={index} className="text-blue-700">
                  {word}
                </span>
              );
            } else {
              return <span key={index}>{word} </span>;
            }
          })}
        </span>
      </span>

      <div className="flex justify-between gap-3 items-center">
        <input
          onChange={handleChange}
          type="text"
          className="bg-transparent border-none p-1  w-full focus:border-none outline-none focus:ring-0"
          placeholder="Add a comment..."
          value={commentText}
        />
        {commentText && <button onClick={sendComment}> post </button>}
        <button>
          <EmojiSmile />
        </button>
      </div>

      {openLikes && (
        <Modal onClose={() => setOpenLikes(false)}>
          <Likes postId={_id} like={like} />
        </Modal>
      )}
    </div>
  );
};

export default PostInteraction;
