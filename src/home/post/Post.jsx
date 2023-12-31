import PostHeader from "./components/PostHeader";
import PostContent from "./components/PostContent";
import PostActions from "./components/PostActions";
import PostInteraction from "./components/PostInteraction";
import { useDispatch, useSelector } from "react-redux";

import { forwardRef, useEffect, useState } from "react";
import SinglePost from "../../common/SinglePost";
import { setFeed } from "../../redux/services/feedSlice";
import Modal from "../../shared/Modal";
import { makeRequest } from "../../config/api.config";
const Post = ({ post }, ref) => {
  const { user } = JSON.parse(localStorage.getItem("user"));
  const { feed, feeds } = useSelector((state) => state.feed);
  const [showPost, setShowPost] = useState(false);

  const dispatch = useDispatch();
  const handleSetPost = () => {
    showCurrentPost();
    dispatch(setFeed(post));
  };

  const showCurrentPost = () => {
    setShowPost((prev) => !prev);
  };



  return (
    <div
      id={post._id}
      ref={ref && ref}
      className="border bg-gray-50 h-fit dark:border-slate-500/30 rounded-lg shadow-md dark:bg-slate-800 relative"
    >
      <div>
        <PostHeader post={post} />
        <PostContent contentUrl={post?.imageUrl} onClick={handleSetPost} />
        <PostActions
          post={post}
          userId={user._id}
          showCurrentPost={handleSetPost}
        />
        <PostInteraction user={user} post={post} />
      </div>
      {showPost && (
        <Modal onClose={showCurrentPost}>
          <SinglePost
            setClose={showCurrentPost}
            post={feed}
            posts={feeds}
            fromFeed={true}
          />
        </Modal>
      )}
    </div>
  );
};

export default forwardRef(Post);
