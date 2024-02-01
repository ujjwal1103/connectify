// src/components/PostList.js
import React, { useCallback, useRef } from "react";
import useInfinitePosts from "../hooks/useInfinitePosts";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../redux/services/postSlice";

const Exp = () => {
  const { posts, loading, hasNext, page } = useInfinitePosts();
  const dispatch = useDispatch();


  const observer = useRef();
  const lastPost = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNext) {
          dispatch(setPage(page + 1))
        }
      });

      if (node) observer?.current.observe(node);
      console.log(node);
    },
    [loading, hasNext]
  );

  return (
    <div className="p-3 h-screen overflow-hidden">
      <div className=" border p-2 overflow-y-scroll h-full">
        {posts?.map((post, index) => {
          console.log(posts.length === index + 1);
          if (posts.length === index + 1) {
            return (
              <div
                ref={lastPost}
                key={post.id}
                className="py-10 h-96 bg-red-400 mb-3 w-96 mx-auto"
              >
                <h2>{post.caption}</h2>
                <p></p>
              </div>
            );
          } else {
            return (
              <div
                key={post.id}
                className="py-10 h-96 bg-red-400 mb-3 w-96 mx-auto"
              >
                <h2>{post.caption}</h2>
                <p></p>
              </div>
            );
          }
        })}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Exp;
