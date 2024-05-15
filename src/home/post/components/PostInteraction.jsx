import { useState } from "react";
import parse, { domToReact } from "html-react-parser";
import UsernameLink from "./../../../shared/UsernameLink";
import Modal from "../../../shared/Modal";
import Likes from "./Likes";
import CommentInput from "./CommentInput";
import { Link } from "react-router-dom";
import { cn } from "../../../utils/helper";

const getCaption = (caption) => {
  const jsx = caption?.split(" ").map((word, index) => {
    if (word.startsWith("#") || word.startsWith("@")) {
      return (
        <Link
          to={`/${word.replace("#", "")}`}
          key={index}
          className="text-blue-700"
        >
          {word}{" "}
        </Link>
      );
    } else {
      return <span key={index}>{word} </span>;
    }
  });

  return <>{jsx}</>;
};

const options = {
  replace({ type, data }) {
    if (type === "text") {
      return getCaption(data);
    }
  },
};

const PostInteraction = ({ post: { _id, user, like, caption } }) => {
  const [openLikes, setOpenLikes] = useState(false);
  const [showMore, setShowMore] = useState(false);
  console.log(
    cn("break-words dark:text-gray-50 w-full h-24 overflow-hidden", {
      "h-auto overflow-auto": showMore,
    })
  );
  return (
    <div className="flex flex-col py-2 justify-center w-full dark:text-gray-50">
      <button className="text-left" onClick={() => setOpenLikes(true)}>
        {like === 0 ? "" : `${like} ${like === 1 ? "like" : "likes"}`}
      </button>
      <div
        className={cn("break-words dark:text-gray-50 w-full overflow-hidden", {
          "h-24": !!caption,
          "h-auto": showMore,
        })}
      >
        <UsernameLink username={user.username} />
        {parse(caption || "", options)}
      </div>
      {!showMore && caption && (
        <button
          onClick={() => setShowMore(true)}
          className="self-start text-link"
        >
          more
        </button>
      )}

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
