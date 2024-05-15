import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfilePicture from "../../common/ProfilePicture";
import PostActions, {
  LikeButton,
} from "../../home/post/components/PostActions";
import { getCurrentUserId } from "../../utils/getCurrentUserId";
import { ImageSlider } from "../../common/ImageSlider/ImageSlider";

import moment from "moment";
import UsernameLink from "../../shared/UsernameLink";
import FollowBtn from "../../shared/Buttons/FollowBtn";
import { ChevronBack, Heart } from "../../icons";
import { useSelector } from "react-redux";
import { CommentText } from "../../common/SinglePost";
import CommentInput from "../../home/post/components/CommentInput";
import { getCommentsByPostId, getPostById } from "../../api";
import { isMobileOnly } from "react-device-detect";
import { useGetQuery } from "../../utils/hooks/useGetQuery";
import { cn } from "../../utils/helper";
import { makeRequest } from "../../config/api.config";

const Post = () => {
  const { postId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [reply, setReply] = useState({
    isReply: false,
    commentId: null,
  });
  const { data, isLoading, setData } = useGetQuery({
    fn: () => getPostById(postId),
    deps: [postId],
  });
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

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
    !isMobileOnly && getComments();
  }, [getComments]);

  return (
    <MobileViewWrapper title="Post">
      {isLoading ? (
        <div className="">Loading</div>
      ) : (
        <div className=" max-h-dvh lg:p-5  min-w-screen  w-full h-full">
          <div className="   flex flex-col lg:grid grid-cols-2 lg:h-singlep w-full lg:p-2 p-2">
            <div className=" bg-zinc-90 flex  flex-col">
              <div className="lg:flex justify-between items-center ">
                <div className="flex items-center p-3 gap-5">
                  <ProfilePicture
                    src={data?.post?.user?.avatar}
                    className="size-12 object-cover  rounded-full"
                  />
                  <UsernameLink
                    username={data?.post?.user?.username}
                    className="cursor-pointer"
                  />
                  {!data?.post?.isFollow &&
                    data?.post?.user?._id !== getCurrentUserId() && (
                      <FollowBtn />
                    )}
                </div>
              </div>
              <ImageSlider
                images={data?.post?.images || []}
                className={"w-full "}
                height="100%"
              />
              <div className="">
                <div>
                  <PostActions
                    post={data?.post}
                    userId={user?._id}
                    size={20}
                    onLike={(like) => {
                      setData((prev) => ({
                        ...prev,
                        post: {
                          ...prev.post,
                          isLiked: like,
                          like: like ? prev.post.like + 1 : prev.post.like - 1,
                        },
                      }));
                    }}
                    showCurrentPost={() => {
                      navigate(`/comments/${postId}`);
                    }}
                  />
                  <span className="px-3 py-1 text-[14px]">
                    {data?.post?.like} likes
                  </span>
                  <p className="px-3 py-1 text-[14px]">
                    <UsernameLink username={data?.post?.user?.username} />{" "}
                    {data?.post?.caption}
                  </p>
                  <span className="px-3 py-1 block text-[12px] text-gray-500">
                    {moment(data?.post?.createdAt)
                      .format("MMMM D YYYY")
                      .toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div
              className={cn(
                "flex flex-col justify-between overflow-hidden dark:text-gray-50"
              )}
            >
              <div className="lg:flex-1 overflow-y-scroll">
                {data?.post?.caption && (
                  <div className="flex px-2 pt-2 gap-2">
                    <ProfilePicture
                      src={data?.post?.user?.avatar}
                      className="size-8 object-cover  rounded-full"
                    />
                    <div className="flex flex-col w-full">
                      <UsernameLink
                        username={data?.post?.user?.username}
                        className="cursor-pointer text-xs"
                      />
                      <span className="text-[12px] overflow-ellipsis w-52">
                        {data?.post?.caption}
                      </span>
                    </div>
                  </div>
                )}
                {!isMobileOnly && comments.length <= 0 && (
                  <div className="lg:h-full h-44 lg:flex justify-center items-center hidden">
                    <div>
                      <h1 className="lg:text-2xl text-center font-semibold">
                        No comments yet.
                      </h1>
                      <p className="text-center">Start the conversation.</p>
                    </div>
                  </div>
                )}
                {!isMobileOnly && comments?.lenght !== 0 && (
                  <div
                    className={cn("overflow-y-scroll hidden lg:block", {
                      hidden: comments?.length === 0,
                    })}
                  >
                    <div className="lg:hidden flex flex-col w-full p-2">
                      <UsernameLink
                        username={data?.post?.user?.username}
                        className="cursor-pointer text-xs"
                      />
                      <span className="text-[12px] overflow-ellipsis">
                        {data?.post?.caption}
                      </span>
                    </div>
                  </div>
                )}
                <CommentList comments={comments} setReply={setReply} />
              </div>

              <CommentInput
                reply={reply.isReply}
                repliedTo={reply.commentId}
                postId={postId}
                setReply={setReply}
                onComment={(comment, isReply) => {
                  if (isReply) {
                    setReply({
                      isReply: false,
                      commentId: null,
                    });
                  } else {
                    setComments((prev) => [comment, ...prev]);
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </MobileViewWrapper>
  );
};

export default Post;

export const MobileViewWrapper = ({ closeIcon, title, children }) => {
  const navigate = useNavigate();
  return (
    <main className="overflow-scroll h-dvh">
      <div className="p-2 sticky top-0 bg-black lg:hidden border-b border-b-slate-500/35">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-0 bottom-0"
        >
          {closeIcon ? closeIcon : <ChevronBack />}
        </button>
        <h1 className="text-center">{title}</h1>
      </div>
      {children}
    </main>
  );
};

export const Comment = ({ comment, setReply }) => {
  const [currentComment, setCurrentComment] = useState(comment);
  const [showHiddenReply, setShowHiddenReply] = useState(false);

  const handleGetComments = async () => {
    try {
      const res = await getCommentsByPostId(
        currentComment?.post?._id,
        currentComment._id
      );
      console.log(res);
      setCurrentComment((prev) => ({ ...prev, childComments: res?.comments }));
      setShowHiddenReply(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      key={currentComment._id}
      className="px-2 mb-2 first:mt-2 dark:text-gray-50  "
    >
      <div className="flex gap-4 items-start">
        <div className=" ">
          <ProfilePicture
            src={currentComment?.user?.avatar}
            className="size-8 object-cover  rounded-full"
          />
        </div>

        <div className="flex-1 text-sm">
          <UsernameLink
            username={currentComment?.user?.username}
            className="font-semibold"
          />
          <span className="pl-2">
            <CommentText
              comment={currentComment?.comment}
              mentions={currentComment?.mentions}
            />
          </span>
          <div className="flex gap-5 text-[10px] text-gray-500">
            <span>{moment(currentComment.updatedAt).fromNow(true)}</span>
            <span>{currentComment?.like} likes</span>
            <button
              onClick={() => {
                setReply({ isReply: true, commentId: currentComment._id });
              }}
            >
              reply
            </button>
          </div>
        </div>
        <LikeButton
          size={15}
          isLiked={currentComment?.isLiked}
          postUserId={currentComment?.post?.userId}
          commentId={currentComment?._id}
          onLikeClick={(like, error) => {
            setCurrentComment((prev) => ({
              ...prev,
              isLiked: like,
              like: like ? prev.like + 1 : prev.like - 1,
            }));
          }}
        />
      </div>

      <div className="ml-20">
        {currentComment?.childComments?.length > 0 && (
          <>
            {showHiddenReply && (
              <CommentList
                comments={currentComment?.childComments}
                setReply={setReply}
              />
            )}
            {!showHiddenReply ? (
              <button className="text-xs" onClick={() => handleGetComments()}>
                show {currentComment?.childComments?.length} replies
              </button>
            ) : (
              <button className="text-xs" onClick={() => setShowHiddenReply(false)}>
                Hide {currentComment?.childComments?.length} replies
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const CommentList = ({ comments, setReply }) => {
  return comments?.map((comment) => {
    return <Comment comment={comment} setReply={setReply} key={comment._id} />;
  });
};
