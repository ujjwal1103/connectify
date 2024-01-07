import Post from "./post/Post";
import Suggetions from "./suggetions/Suggetions";
import Story from "./story/Story";
import Sidebar from "./components/Sidebar";
import { useCallback, useRef, useState } from "react";
import usePosts from "../hooks/usePosts";
import VideoPlayer from "./components/VideoPlayer";

const HomePage = () => {
  const [pageNum, setPageNum] = useState(1);
  const { isLoading, isError, error, feeds, hasNextPage } = usePosts(pageNum);
  const intObserver = useRef();

  const lastPostRef = useCallback(
    (post) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log("We are near the last post!");
          setPageNum((prev) => prev + 1);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  if (isError)
    return (
      <p className="flex h-screen w-screen text-white">
        Error: {error.message}
      </p>
    );

  const content = feeds.map((post, i) => {
    if (feeds.length === i + 1) {
      return <Post ref={lastPostRef} key={post.id} post={post} />;
    }
    return <Post key={post.id} post={post} />;
  });

  return (
    <div className=" flex w-full p-4 lg:gap-10 flex-col dark:bg-slate-900 z-10">
      <div className=" hidden  justify-start px-2">
        <Story />
      </div>

      <div className="flex lg:gap-10">
        <Sidebar />
        <div className="flex flex-1  gap-10 justify-between z-10">
          <div className=" grid grid-cols-1 flex-1 flex-col  gap-10 ">
            {/* {feeds.map((post, i) => (
              <Post ref={lastPostRef} key={post._id} post={post} />
            ))} */}
            {content}
            {isLoading && (
              <p className="text-center text-white">
                <div className=" grid grid-cols-1 flex-1 flex-col  gap-10">
                  {[1, 2].map((i) => (
                    <div className="border animate-pulse bg-gray-50 h-96 w-full dark:border-slate-500/30 rounded-lg shadow-md dark:bg-slate-800 relative"></div>
                  ))}
                </div>
              </p>
            )}
          </div>

          <Suggetions />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
