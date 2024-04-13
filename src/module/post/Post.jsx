import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeRequest } from "../../config/api.config";
import ProfilePicture from "../../common/ProfilePicture";
import PostActions from "../../home/post/components/PostActions";
import { getCurrentUserId } from "../../utils/getCurrentUserId";
import { ImageSlider } from "../../common/ImageSlider/ImageSlider";

import moment from "moment";
import UsernameLink from "../../shared/UsernameLink";
import FollowBtn from "../../shared/Buttons/FollowBtn";
import { Heart } from "../../icons";
import { useSelector } from "react-redux";
import { CommentText } from "../../common/SinglePost";
import CommentInput from "../../home/post/components/CommentInput";

const Post = () => {
  const { postId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const getPost = useCallback(async () => {
    try {
      const res = await makeRequest.get(`/post/${postId}`);
      setPost(res?.post);
    } catch (error) {}
  }, [postId]);


  const getComments = useCallback(async () => {
    try {
      const data = await makeRequest(`/comments/${postId}`);
      if (data.isSuccess) {
        setComments(data.comments);
      }
    } catch (error) {
      console.log(error);
    }
  }, [postId]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  if (!post) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="max-w-screen min-w-screen max-h-dvh lg:min-h-page  lg:h-page w-full m-auto  lg:grid grid-cols-2 flex flex-col">
      <div className=" bg-zinc-90  lg:h-page flex justify-center items-center" >
        <ImageSlider images={post.imageUrl} className={"w-full h-full"} />
      </div>

      <div className=" flex flex-col   justify-between overflow-hidden dark:text-gray-50">
        <div className="hidden lg:flex justify-between items-center">
          <div className="flex-center  p-3 gap-5">
            <ProfilePicture
              src={post?.user?.avatar}
              className="size-12 object-cover  rounded-full"
            />
            <UsernameLink
              username={post?.user?.username}
              className="cursor-pointer"
            />
            {!post.isFollow && post.user._id !== getCurrentUserId() && (
              <FollowBtn  />
            )}
          </div>
        </div>

        <div className="lg:flex-1 overflow-y-scroll">
          {post?.caption && (
            <div className="flex px-2 pt-2 gap-2">
              <ProfilePicture
                src={post?.user?.avatar}
                className="size-8 object-cover  rounded-full"
              />
              <div className="flex flex-col w-full">
                <UsernameLink
                  username={post?.user?.username}
                  className="cursor-pointer text-xs"
                />
                <span className="text-[12px] overflow-ellipsis w-52">
                  {post.caption}
                </span>
              </div>
            </div>
          )}
          {comments.length <= 0 && (
            <div className="lg:h-full h-44 flex justify-center items-center ">
              <div>
                <h1 className="lg:text-2xl text-center font-semibold">
                  No comments yet.
                </h1>
                <p className="text-center">Start the conversation.</p>
              </div>
            </div>
          )}
          {comments?.lenght !== 0 && (
            <div
              className={` overflow-y-scroll ${
                comments?.length === 0 && "hidden"
              }`}
            >
              {comments?.map((comment) => {
                return (
                  <div
                    key={comment._id}
                    className="px-2 mb-2 first:mt-2 dark:text-gray-50  "
                  >
                    <div className="flex gap-4 items-start">
                      <div className=" ">
                        <ProfilePicture
                          src={comment.from.avatar}
                          className="size-8 object-cover  rounded-full"
                        />
                      </div>

                      <div className="flex-1 text-[12px]">
                        <span className="font-semibold">
                          {comment.from.username}
                        </span>
                        <span className="pl-2">
                          <CommentText
                            comment={comment?.comment}
                            mentions={comment?.mentions}
                          />
                        </span>
                        <div className="flex gap-5 text-[10px]">
                          <span>{moment(comment.updatedAt).fromNow()}</span>
                          <span>1 like</span>
                          <span>reply</span>
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
        </div>

        <div className=" ">
          <div>
            <PostActions post={post} userId={user?._id} size={20} onLike={(like)=>{
              setPost((prev) => ({ ...prev, isLiked: like }));
            }}/>
            <span className="px-3 py-1 text-[14px]">{post?.like} likes</span>
            <span className="px-3 py-1 block text-[12px] text-gray-500">
              {moment(post?.createdAt).format("MMMM D YYYY").toUpperCase()}
            </span>
          </div>

         
            <CommentInput postId={post._id} onComment={
              (c)=>{
                setComments((prev) => [c, ...prev]);
              }
            }/>
        
        </div>
      </div>
    </div>
  );
};

export default Post;
