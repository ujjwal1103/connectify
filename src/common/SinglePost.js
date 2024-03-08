import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostActions from "../home/post/components/PostActions";
import moment from "moment";
import {
  ChevronBack,
  ChevronForward,
  EmojiWink,
  Heart,
  ThreeDots,
} from "../icons";
import { makeRequest } from "../config/api.config";
import avatar from "../assets/man.png";
import UsernameLink from "../shared/UsernameLink";
import ProfilePicture from "./ProfilePicture";
import FollowBtn from "../shared/Buttons/FollowBtn";
import { getCurrentUserId } from "../utils/getCurrentUserId";
import { followUser } from "../profile/services/postServices";
import { ImageSlider } from "./ImageSlider/ImageSlider";

const SinglePost = ({ post, posts }) => {
  const { user } = useSelector((state) => state.auth);
  const [currPost, setCurrentPost] = useState(post);
  const [commentText, setCommentText] = useState(null);
  const [comments, setComments] = useState([]);

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  const getComments = useCallback(async () => {
    try {
      const data = await makeRequest(`/comments/${currPost?._id}`);
      if (data.isSuccess) {
        setComments(data.comments);
      }
    } catch (error) {
      console.log(error);
    }
  }, [currPost?._id]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  const handleLeftClick = () => {
    const index = posts.findIndex((p) => p._id === currPost._id);

    if (index === 0) {
      return;
    }
    setCurrentPost(posts[index - 1]);
  };

  const handleRightClick = () => {
    const index = posts.findIndex((p) => p?._id === currPost?._id);

    console.log(posts[index + 1]);
    if (index === posts.length - 1) {
      return;
    }

    setCurrentPost(posts[index + 1]);
  };

  const sendComment = async () => {
    try {
      const data = await makeRequest.post(`/comment`, {
        post: currPost?._id,
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

  const handleFollowRequest = async () => {
    const data = await followUser(currPost?._id);
    console.log("RESPONSE", data);
    setCurrentPost((prev) => ({ ...prev, isFollow: true }));
  };

  return (
    <div className="max-w-[70%] min-w-[1024px] w-[900px]  m-auto lg:h-post   overflow-y-auto shadow-2xl grid grid-cols-2 flex-col lg:flex-row bg-white dark:bg-zinc-900">
      {posts.length > 0 && (
        <button
          className="absolute top-1/2 left-10 text-3xl text-white hidden lg:block "
          onClick={handleLeftClick}
        >
          <ChevronBack />
        </button>
      )}
      {posts.length > 0 && (
        <button
          className="absolute top-1/2 right-10  text-3xl text-white hidden lg:block"
          onClick={handleRightClick}
        >
          <ChevronForward />
        </button>
      )}
      <div className=" bg-zinc-950 flex justify-center items-center">
        <ImageSlider
          images={currPost.imageUrl}
          className={"w-full "}
        />
      </div>

      <div className="flex flex-col  dark:text-gray-50">
        <div className="hidden lg:flex  justify-between items-center">
          <div className="flex items-center justify-center  p-3 gap-5">
            <ProfilePicture
              src={currPost?.user?.avatar || avatar}
              className="w-12 h-12 object-cover border-2 border-white rounded-full"
            />
            <UsernameLink
              username={currPost?.user?.username}
              className="cursor-pointer"
            />
            {!currPost.isFollow && currPost.user._id !== getCurrentUserId() && (
              <FollowBtn onClick={handleFollowRequest} />
            )}
          </div>
          <div>
            <ThreeDots className=" mx-4" size={24} />
          </div>
        </div>
        <hr />
        {currPost?.caption && (
          <div className="flex 4  px-3 pt-2 gap-5">
            <ProfilePicture
              src={post?.user?.avatar || avatar}
              className="w-10 h-10 object-cover border-2 border-white rounded-full"
            />
            <div>
              <UsernameLink
                username={currPost?.user?.username}
                className="cursor-pointer"
              />
              <div className="text-sm"> {currPost.caption}</div>
            </div>
          </div>
        )}
        {comments.length <= 0 && (
          <div className="flex-1 flex justify-center items-center ">
            <div>
              <h1 className="text-2xl text-center font-semibold">
                No comments yet.
              </h1>
              <p className="text-center">Start the conversation.</p>
            </div>
          </div>
        )}
        {comments?.lenght !== 0 && (
          <div
            className={`flex-1 max-h-96 lg:max-h-full overflow-y-scroll ${
              comments?.length <= 0 && "hidden"
            }`}
          >
            {comments?.map((comment) => {
              return (
                <div key={comment._id} className="p-3 dark:text-gray-50  ">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 ">
                      <img
                        src={comment.from.avatar || avatar}
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                    </div>

                    <div className="flex-1 text-sm">
                      <span className="font-semibold">
                        {comment.from.username}
                      </span>
                      <span className="pl-2">
                        <CommentText
                          comment={comment?.comment}
                          mentions={comment?.mentions}
                        />
                      </span>
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
        )}

        <hr />
        <div>
          <PostActions post={currPost} userId={user?._id} />
          <span className="p-3">{currPost?.like} likes</span>
          <span className="p-3 block text-xs text-gray-500">
            {moment(currPost?.createdAt).format("MMMM D YYYY").toUpperCase()}
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
  );
};

export default SinglePost;

const CommentText = ({ comment, mentions }) => {
  const highlightMentions = () => {
    if (!mentions || mentions.length === 0) {
      return comment;
    }

    // Split the comment text into words
    const words = comment.split(" ");

    // Map over the words and apply red color to mentioned words
    const highlightedText = words.map((word, index) =>
      mentions.includes(word) ? (
        <>
          <UsernameLink key={index} username={word} className="text-blue-500" />{" "}
        </>
      ) : (
        word + " "
      )
    );

    return <>{highlightedText}</>;
  };

  return <span>{highlightMentions()}</span>;
};
