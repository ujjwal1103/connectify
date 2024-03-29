import Post from "./post/Post";
import Suggetions from "./suggetions/Suggetions";
import Sidebar from "./components/Sidebar";
import { useCallback, useRef, useState } from "react";
import usePosts from "../hooks/usePosts";
import NoPosts from "../profile/components/NoPosts";
import InfiniteScroll from "react-infinite-scroll-component";
import { ErrorPage } from "../App";
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

  if (isError) return <ErrorPage />;

  const content = feeds.map((post, i) => {
    if (feeds.length === i + 1) {
      return <Post ref={lastPostRef} key={post._id} post={post} />;
    }
    return <Post key={post._id} post={post} />;
  });

  return (
    <main className=" flex w-full z-0 p-3 lg:gap-4 flex-col  h-post md:h-screen lg:h-page overflow-y-scroll">
      {/* <div className="hidden justify-start px-2">
        <Story />
      </div> */}
      <div className="flex lg:gap-3">
        <div className="hidden md:hidden lg:block lg:w-fit">
          <Sidebar />
        </div>
        <section
          className="flex flex-1 gap-3 justify-between"
          id="scrollableDiv"
        >
          <div className="grid grid-cols-1 flex-1 flex-col gap-5">
            {content}
            {/* <InfiniteScroll
              dataLength={feeds.length}
              next={() => {
                setPageNum(pageNum + 1);
              }}
              hasMore={hasNextPage}
              loader={<FeedLoading />}
              // endMessage={
              //   <p style={{ textAlign: "center" }}>
              //     <b>Yay! You have seen it all</b>
              //   </p>
              // }
              crollableTarget={"scrollableDiv"}
            >
              {feeds.map((post, i) => {
                return <Post key={post._id} post={post} />;
              })}
            </InfiniteScroll> */}

            {isLoading && <FeedLoading />}
            {feeds.length === 0 && !isLoading && (
              <div className="bg-zinc-800 rounded-lg">
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

const FeedLoading = () => {
  return (
    <div className=" h-full ">
      <div className=" grid grid-cols-1 flex-1 flex-col  gap-5">
        {[1].map((i) => (
          <div
            key={i}
            className="border dark:border-zinc-500/30 p-2 bg-zinc-900  w-full  rounded-lg shadow-md relative"
          >
            <div className="bg-zinc-950 w-full h-14 rounded-md">
              <div className="flex h-full px-2 items-center">
                <div className="w-10 h-10 bg-zinc-800 rounded-full"></div>
                <div className="flex flex-col gap-1 px-2">
                  <span className="w-20 h-4 p-2 bg-zinc-800 rounded-2xl"></span>
                  <span className="w-10 h-2 p-2 bg-zinc-800 rounded-2xl"></span>
                </div>
              </div>
            </div>
            <div className="h-64 mt-3 bg-zinc-950 rounded-md w-full"></div>
            <div className="h-20 mt-3 bg-zinc-950 rounded-md w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
