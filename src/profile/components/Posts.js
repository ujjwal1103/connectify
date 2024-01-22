import { useCallback, useRef, useState } from "react";
import NoPosts from "./NoPosts";
import Post from "./Post";
import { PostLoading } from "./UserLoading";
import useMyPosts from "../../hooks/useMyPosts";
import Loading from "../../common/Loading";

const Posts = ({ userId }) => {
  const [pageNum, setPageNum] = useState(1);
  const { isLoading, posts, hasNextPage, emptyPosts } = useMyPosts(
    pageNum,
    userId
  );

  console.log(isLoading, "loading");

  const intObserver = useRef();

  const lastPostRef = useCallback(
    (post) => {
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((p) => {
        if (p[0].isIntersecting && hasNextPage) {
          setPageNum((prev) => prev + 1);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

 

  if (emptyPosts) {
    return <NoPosts />;
  }

  const renderPosts = posts?.map((post, index) => (
    <Post
      ref={posts.length === index + 1 ? lastPostRef : null}
      key={post.id}
      post={post}
    />
  ));

  return (
    <div
      className={`flex-1 ${
        posts?.length <= 6 ? "lg:h-full xl:h-auto" : "xl:h-full h-full"
      } grid lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 gap-4 pb-5 overflow-y-scroll`}
    >
      {renderPosts}

      {isLoading && <PostLoading />}
    </div>
  );
};

export default Posts;
