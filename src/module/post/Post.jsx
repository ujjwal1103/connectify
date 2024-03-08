import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeRequest } from "../../config/api.config";
import ProfilePicture from "../../common/ProfilePicture";
import PostInteraction from "../../home/post/components/PostInteraction";
import PostActions from "../../home/post/components/PostActions";
import { getCurrentUserId } from "../../utils/getCurrentUserId";

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const getPost = useCallback(async () => {
    try {
      const res = await makeRequest.get(`/post/${postId}`);
      setPost(res?.post);
    } catch (error) {}
  }, [postId]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  if (!post) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="h-screen p-3 ">
      <div className="flex p-2 items-center gap-3">
        <ProfilePicture
          src={post?.user?.avatar}
          className="rounded-full w-10 h-10 object-cover"
        />
        <div>
          <span>{post?.user?.username}</span>
        </div>
      </div>
      <div className="py-2">
        <img src={post?.imageUrl} className="w-96" alt="images" />
      </div>

      <PostActions post={post} userId={getCurrentUserId()} />
      <PostInteraction post={post} />
    </div>
  );
};

export default Post;
