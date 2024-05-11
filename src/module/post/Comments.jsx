import React, { useCallback, useEffect, useState } from "react";
import { MobileViewWrapper } from "./Post";
import { getCommentsByPostId } from "../../api";
import { useParams } from "react-router-dom";
import ProfilePicture from "../../common/ProfilePicture";
import { CommentText } from "../../common/SinglePost";
import { Heart } from "../../icons";
import moment from "moment";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const { postId } = useParams();

  const getComments = useCallback(async () => {
    try {
      const data = await getCommentsByPostId(postId);
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

  return (
    <MobileViewWrapper title={"Comments"}>
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
          className={` overflow-y-scroll h-scroll ${comments?.length === 0 && "hidden"}`}
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
    </MobileViewWrapper>
  );
};

export default Comments;
