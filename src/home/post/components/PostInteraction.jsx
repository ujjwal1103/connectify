import { useState } from "react";

import UsernameLink from "./../../../shared/UsernameLink";
import Modal from "../../../shared/Modal";
import Likes from "./Likes";
import CommentInput from "./CommentInput";

const PostInteraction = ({ post: { _id, user, like, caption } }) => {
  const [openLikes, setOpenLikes] = useState(false);

  return (
    <div className="flex flex-col py-2 justify-center  dark:text-gray-50">
      <button className="text-left" onClick={() => setOpenLikes(true)}>
        {like === 0 ? "" : `${like} ${like === 1 ? "like" : "likes"}`}
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

      <div className="pt-2 ">
        <CommentInput postId={_id} />
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
