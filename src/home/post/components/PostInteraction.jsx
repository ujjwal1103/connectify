import { useState } from "react";
import { makeRequest } from "../../../config/api.config";
import { EmojiSmile } from "../../../icons";
import { Link } from "react-router-dom";

const PostInteraction = ({ user, post: { _id, userId, likedBy, caption } }) => {
  const [commentText, setCommentText] = useState(null);

  const path =
    userId.username === user.username ? "/profile" : `/${userId.username}`;

  const handleChange = (e) => {
    if (e.target.value.startsWith("@")) {
      console.log("show users");
    }

    setCommentText(e.target.value);
  };

  // useEffect(() => {
  //   const getComments = async () => {
  //     try {
  //       const { data } = await makeRequest(`/comments/${_id}`);
  //       if (data.isSuccess) {
  //         setComments(data.comments);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getComments();
  // }, [_id]);

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
    <div className="flex flex-col p-3 dark:text-gray-50">
      <span>{likedBy.length} likes</span>
      <span className="line-clamp-2 dark:text-gray-50">
        <Link to={path}>{userId?.username}</Link>{" "}
        <span>
          {caption.split(" ").map((word, index) => {
            if (word.startsWith("#")) {
              return (
                <span key={index} className="text-blue-700">
                  {word}{" "}
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
