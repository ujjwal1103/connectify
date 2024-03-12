import PostHeader from "./components/PostHeader";
import PostContent from "./components/PostContent";
import PostActions from "./components/PostActions";
import PostInteraction from "./components/PostInteraction";
import { useDispatch, useSelector } from "react-redux";

import { forwardRef, useState } from "react";
import SinglePost from "../../common/SinglePost";
import { setFeed } from "../../redux/services/feedSlice";
import Modal from "../../shared/Modal";
import platform from "platform";
import { useNavigate } from "react-router-dom";
import { getCurrentUserId } from "../../utils/getCurrentUserId";

const Post = ({ post }, ref) => {
  const userId = getCurrentUserId();
  const { feed, feeds } = useSelector((state) => state.feed);
  const [showPost, setShowPost] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleSetPost = () => {
    if (platform.os.family !== "Windows") {
      navigate(`p/${post._id}`);
    } else {
      showCurrentPost();
      dispatch(setFeed(post));
    }
  };

  const showCurrentPost = () => {
    setShowPost((prev) => !prev);
  };

  return (
    <article
      id={post._id}
      ref={ref && ref}
      className=" bg-gray-50 flex dark:border-zinc-500/30 rounded-lg  shadow-md dark:bg-zinc-900 relative"
    >
      <div className="lg:p-3 md:p-3 p-2 flex flex-col justify-between flex-1">
        <PostHeader post={post} />
        <PostContent contentUrl={post?.imageUrl} onClick={handleSetPost} />
        <PostActions
          post={post}
          userId={userId}
          showCurrentPost={handleSetPost}
        />
        <PostInteraction post={post} />
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
    </article>
  );
};

export default forwardRef(Post);
