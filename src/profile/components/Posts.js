import { useCallback, useEffect, useRef } from "react";
import NoPosts from "./NoPosts";
import Post from "./Post";
import { useDispatch } from "react-redux";
import { reset, setPage } from "../../redux/services/postSlice";
import { PostLoading } from "./UserLoading";
import useInfinitePosts from "../../hooks/useInfinitePosts";

const Posts = ({ userId, username }) => {

  const { posts, loading, hasNext, page } = useInfinitePosts(
    userId,
    username,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [username, dispatch]);

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

  if (!loading && !posts.length) {
    return <NoPosts />;
  }

  if (page === 1 && loading) {
    return <PostLoading className='flex-1 h-full w-screen overflow-hidden px-3  lg:px-0'/>;
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
      className={` w-screen px-3 pb-3 lg:p-0 h-auto flex-[0.7]`}
    >
      <div
        className={`grid lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 grid-cols-2 lg:gap-4 gap-2`}
      >
        {renderPosts}
      </div>
      {loading && <PostLoading className="h-full overflow-hidden pt-4 "/>}
    </div>
  );
};

export default Posts;
