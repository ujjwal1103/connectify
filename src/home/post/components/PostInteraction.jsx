import { useState } from "react";
import { makeRequest } from "../../../config/api.config";
import { EmojiSmile } from "../../../icons";
import UsernameLink from "./../../../shared/UsernameLink";

const PostInteraction = ({ post: { _id, user, likedBy, caption } }) => {
  const [commentText, setCommentText] = useState(null);
  const [likes, setLikes] = useState([]);
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

  const fetchLikes = async (_id) => {
    try {
      if (likedBy.length > 0) {
        const res = await makeRequest(`/postLikes/${_id}`);
        setLikes(res.likes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col p-3 dark:text-gray-50">
      <span className="" onClick={fetchLikes}>
        {likedBy.length === 0
          ? ""
          : `${likedBy.length} ${likedBy.length === 1 ? "like" : "likes"}`}
      </span>

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

      <div className="flex justify-between gap-6 items-center">
        <input
          onChange={handleChange}
          type="text"
          className="bg-transparent border-none  w-full focus:border-none outline-none focus:ring-0 my-2"
          placeholder="Add a comment..."
          value={commentText}
        />
        {commentText && <button onClick={sendComment}> post </button>}
        <button>
          <EmojiSmile />
        </button>
      </div>
    </div>
  );
};

export default PostInteraction;
