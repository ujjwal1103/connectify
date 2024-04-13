import Post from "./post/Post";
import Suggetions from "./suggetions/Suggetions";
import { useCallback, useRef, useState } from "react";
import usePosts from "../hooks/usePosts";
import NoPosts from "../profile/components/NoPosts";
import { ErrorPage } from "../App";
import SuggetionContainer from "../common/suggetions";
import { Link } from "react-router-dom";
import { ImageComponent } from "../profile/components/Post";
import { BiLoaderAlt } from "react-icons/bi";
import { useSelector } from 'react-redux';
const HomePage = () => {
  const [pageNum, setPageNum] = useState(1);
  const { isLoading, isError, feeds, hasNextPage } = usePosts(pageNum);
  const intObserver = useRef();
  const {uploadingPost} = useSelector(state=>state.post)
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
    [hasNextPage, isLoading]
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
        {/* <div className="hidden md:hidden lg:block lg:w-fit">
          <Sidebar />
        </div> */}
        <section
          className="flex lg:m-auto gap-3 lg:w-[80%] w-full justify-between"
          id="scrollableDiv"
        >
          <div className="grid grid-cols-1 flex-1 flex-col gap-5">
        {uploadingPost.loading &&  <section className="bg-gray-50 flex gap-5 items-center dark:border-zinc-500/30 rounded-lg w-full shadow-md dark:bg-zinc-900 relative p-3">
            <ImageComponent src={uploadingPost.post.imageUrls[0].url} className="size-10"/>
            <span>Posting</span>
            <BiLoaderAlt className="animate-spin ml-auto"/>
          </section>}
            {content}

            {isLoading && <FeedLoading />}
           
            {feeds.length === 0 && !isLoading && (
              <div className=" lg:h-auto lg:w-auto">
                <div className="dark:bg-zinc-800 rounded-lg h-36 lg:h-auto">
                  <NoPosts />
                </div>
                <div className="p-2 flex  justify-between">
                  <span>Suggetions</span>{" "}
                  <Link to="/expore/people">View More</Link>
                </div>
                <SuggetionContainer />
              </div>
            )}
            <section className="invisible relative overflow-hidden bg-white lg:py-0 py-4 dark:bg-transparent dark:text-white"/>
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
