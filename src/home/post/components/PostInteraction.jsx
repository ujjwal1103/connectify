import React, { useState, useEffect } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { makeRequest } from "../../../config/api.config";

const PostInteraction = ({ user, post }) => {
  const [commentText, setCommentText] = useState(null);
  const [comments, setComments] = useState([]);

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const { data } = await makeRequest(`/comments/${post?._id}`);
        if (data.isSuccess) {
          setComments(data.comments);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [post?._id]);

  const sendComment = async () => {
    try {
      const { data } = await makeRequest.post(`/comment`, {
        post: post?._id,
        comment: commentText,
      });
      if (data.isSuccess) {
        setComments((prev) => [...prev, data.comment]);
        setCommentText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col p-3 dark:text-gray-50">
      <span>{post.likedBy.length} likes</span>
      <span className="line-clamp-2 dark:text-gray-50">
        {user.username} <span>{post.caption}</span>
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
          <BsEmojiSmile />
        </button>
      </div>
    </div>
  );
};

export default PostInteraction;
