import Post from "./post/Post";
import Suggetions from "./suggetions/Suggetions";
import Sidebar from "./components/Sidebar";
import { useCallback, useRef, useState } from "react";
import usePosts from "../hooks/usePosts";
import NoPosts from "../profile/components/NoPosts";

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
          setPageNum((prev) => prev + 1);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  if (isError)
    return (
      <div className="flex h-page  flex-col  gap-3 justify-center items-center text-white">
        <div className="bg-red-300  p-3 font-semibold text-red-900 border-2 border-red-900 rounded-md">
          {error.message}
        </div>
        <button
          className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700"
          onClick={() => {
            window.location.reload();
          }}
        >
          RETRY
        </button>
      </div>
    );

  const content = feeds.map((post, i) => {
    if (feeds.length === i + 1) {
      return <Post ref={lastPostRef} key={post.id} post={post} />;
    }
    return <Post key={post.id} post={post} />;
  });

  return (
    <main className=" flex w-full p-4 lg:gap-10 flex-col z-10 h-post md:h-screen lg:h-page overflow-y-scroll">
      {/* <div className="hidden justify-start px-2">
        <Story />
      </div> */}
      <div className="flex lg:gap-10">
        <Sidebar />
        <section className="flex flex-1 gap-10 justify-between z-10">
          <div className="grid grid-cols-1 flex-1 flex-col  gap-5 ">
            {content}

            {isLoading && (
              <div className="text-center text-white">
                <div className=" grid grid-cols-1 flex-1 flex-col  gap-5">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="border  p-2 bg-gray-50 h-96 w-full dark:border-slate-950 rounded-lg shadow-md dark:bg-slate-800 relative"
                    >
                      <div className="bg-zinc-950 w-full h-14 rounded-md">
                        <div className="flex h-full px-2 items-center">
                          <div className="w-10 h-10 bg-zinc-800 rounded-full"></div>
                          <div className="flex flex-col gap-1 px-2">
                            <span className="w-20 h-4 p-2 bg-zinc-800"></span>
                            <span className="w-10 h-2 p-2 bg-zinc-800"></span>
                          </div>
                        </div>
                      </div>
                      <div className="h-52 mt-3 bg-zinc-950 rounded-md w-full"></div>
                      <div className="h-20 mt-3 bg-zinc-950 rounded-md w-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {feeds.length === 0 && (
              <div className="bg-slate-800 rounded-lg">
                <NoPosts />
              </div>
            )}
            <section className="invisible relative overflow-hidden bg-white lg:py-8 py-7 dark:bg-transparent dark:text-white"></section>
          </div>

          <Suggetions />
        </section>
      </div>
    </main>
  );
};

export default HomePage;
