import PostHeader from "./components/PostHeader";
import PostContent from "./components/PostContent";
import PostActions from "./components/PostActions";
import PostInteraction from "./components/PostInteraction";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import SinglePost from "../../common/SinglePost";
import { setFeed } from "../../redux/services/feedSlice";
const Post = ({ post }) => {
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
    // document.body.classList.toggle("overflow-hidden");
  };

  return (
    <div
      id={post._id}
      className="border bg-gray-50 h-auto  dark:border-slate-500/30 rounded-lg shadow-md dark:bg-slate-800 relative"
    >
      <div>
        <PostHeader post={post} username={user?.username} />
        <PostContent contentUrl={post?.imageUrl} onClick={handleSetPost} />
        <PostActions
          post={post}
          userId={user._id}
          username={user.username}
          showCurrentPost={handleSetPost}
        />
        <PostInteraction user={user} post={post} />
      </div>
      {showPost && (
        <SinglePost
          setClose={showCurrentPost}
          post={feed}
          posts={feeds}
          fromFeed={true}
        />
      )}
    </div>
  );
};

export default Post;
