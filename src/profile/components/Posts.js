import { useCallback, useEffect, useRef } from "react";
import NoPosts from "./NoPosts";
import Post from "./Post";
import { useDispatch } from "react-redux";
import { reset, setPage } from "../../redux/services/postSlice";
import { PostLoading } from "./UserLoading";
import useInfinitePosts from "../../hooks/useInfinitePosts";

const Posts = ({ userId, username }) => {
  const { posts, loading, hasNext, page } = useInfinitePosts(userId, username);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [username]);

  const observer = useRef();
  const lastPost = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNext) {
          dispatch(setPage(page + 1));
        }
      });

      if (node) observer?.current.observe(node);
    },
    [loading, hasNext, dispatch, page]
  );

  if (!loading && posts.length === 0) {
    return <NoPosts />;
  }

  const renderPosts = posts?.map((post, index) => {
    if (posts.length === index + 1) {
      return <Post ref={lastPost} key={post._id} post={post} />;
    } else {
      return <Post key={post._id} post={post} />;
    }
  });

  return (
    <div
      className={`lg:overflow-y-scroll  ${
        posts?.length <= 6 ? "lg:h-full xl:h-auto" : "xl:h-full h-full"
      }`}
    >
      <div
        className={`grid lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 gap-4  `}
      >
        {renderPosts}
      </div>
      {loading && <PostLoading />}
    </div>
  );
};

export default Posts;
