import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostActions from "../home/post/components/PostActions";
import moment from "moment";
import { setPost } from "../redux/services/postSlice";
import { EmojiWink, Heart, OutlineClose, ThreeDots } from "../icons";
import { makeRequest } from "../config/api.config";
import avatar from "../assets/man.png";
import { setFeed } from "../redux/services/feedSlice";
import UsernameLink from "../shared/UsernameLink";
const SinglePost = ({ setClose, post, posts, fromFeed }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [commentText, setCommentText] = useState(null);
  const [comments, setComments] = useState([]);

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  const getComments = useCallback(async () => {
    try {
      const data = await makeRequest(`/comments/${post?._id}`);
      if (data.isSuccess) {
        setComments(data.comments);
      }
    } catch (error) {
      console.log(error);
    }
  }, [post?._id]);

  useEffect(() => {
    getComments();
  }, [getComments, post._id]);

  const handleLeftClick = () => {
    const index = posts.findIndex((p) => p._id === post._id);

    if (index === 0) {
      return;
    }
    if (fromFeed) dispatch(setFeed(posts[index - 1]));
    else dispatch(setPost(posts[index - 1]));
  };

  const handleRightClick = () => {
    console.log(post);
    const index = posts.findIndex((p) => p?._id === post?._id);
    console.log(index);
    if (index === posts.length - 1) {
      return;
    }

    if (fromFeed) dispatch(setFeed(posts[index + 1]));
    else dispatch(setPost(posts[index + 1]));
  };

  const sendComment = async () => {
    try {
      const data = await makeRequest.post(`/comment`, {
        post: post?._id,
        comment: commentText,
      });
      if (data.isSuccess) {
        setComments((prev) => [data.comment, ...prev]);
        setCommentText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full   overflow-y-scroll bg-opacity-70 backdrop-blur-sm bg-white dark:bg-gray-900 dark:bg-opacity-50 flex  items-center justify-center">
      <button
        className="absolute top-1/2 left-10 text-3xl text-white hidden lg:block "
        onClick={handleLeftClick}
      >
        {"<"}
      </button>
      <button
        className="absolute top-1/2 right-10  text-3xl text-white hidden lg:block"
        onClick={handleRightClick}
      >
        {">"}
      </button>
      <div className="lg:w-3/4 lg:h-[96%] w-full overflow-y-auto shadow-xl flex flex-col lg:flex-row bg-white dark:bg-gray-700">
        <img
          src={post?.imageUrl}
          alt="ujjwal"
          className="lg:w-1/2 h-96 lg:h-full flex-1 bg-gray-900 object-contain"
        />
        <div className="flex flex-col flex-1 dark:text-gray-50">
          <div className="hidden lg:flex  justify-between items-center">
            <div className="flex items-center justify-center  p-3 gap-5">
              <img
                src={post?.userId?.profilePicture || avatar}
                alt=""
                className="w-12 h-12 object-cover border-2 border-white rounded-full"
              />
              <UsernameLink
                username={post?.userId?.username}
                className="cursor-pointer"
              />
              <h2 className="text-sky-600 cursor-pointer">Follow</h2>
            </div>
            <div>
              <ThreeDots className=" mx-4" size={24} />
            </div>
          </div>
          <hr />
          <div className="flex-1 max-h-96 lg:max-h-full overflow-y-scroll">
            {comments?.map((comment) => {
              return (
                <div key={comment._id} className="p-3 dark:text-gray-50  ">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 ">
                      <img
                        src={comment.from.profilePicture || avatar}
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                    </div>

                    <div className="flex-1 text-sm">
                      <span className="font-semibold">
                        {comment.from.username}
                      </span>{" "}
                      {comment.comment}
                      <div className="flex gap-5 text-sm pt-2">
                        <div>{comment.updatedAt}</div>
                        <div>1 like</div>
                        <div>reply</div>
                      </div>
                    </div>

                    <div className="">
                      <Heart size={12} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <hr />
          <div>
            <PostActions post={post} userId={user?._id} />
            <span className="p-3">{post?.likedBy?.length} likes</span>
            <span className="p-3 block text-xs text-gray-500">
              {moment(post?.createdAt).format("MMMM D YYYY").toUpperCase()}
            </span>
          </div>
          <hr />
          <div className="flex  items-center justify-between mx-4 mb-2  gap-4">
            <span>
              <EmojiWink />
            </span>
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 border-none !ring-0 bg-transparent"
              value={commentText}
              onChange={handleChange}
            />
            {commentText && <button onClick={sendComment}>post</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
