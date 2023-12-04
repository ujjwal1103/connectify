import { useCallback, useEffect } from "react";
import { makeRequest } from "../../config/api.config";
import { useDispatch, useSelector } from "react-redux";
import { setError, setPosts } from "../../redux/services/postSlice";
import NoPosts from "./NoPosts";
import Post from "../Post";

const Posts = ({ userId }) => {
  const dispatch = useDispatch();

  const { posts, loading } = useSelector((s) => s.post);
  const getPosts = useCallback(async () => {
    try {
      const res = await makeRequest(`/users/${userId || "posts"}`);

      if (res.isSuccess) {
        dispatch(setPosts(res.posts));
      }
    } catch (error) {
      dispatch(setError("something went wrong"));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    getPosts();
    return () => {
      dispatch(setPosts([]));
    };
  }, [dispatch, getPosts]);

  if (loading) {
    return (
      <div className="lg:min-w-[60] lg:max-w-[80%] lg:mx-auto">
        <div className="grid lg:grid-cols-3  place-content-center gap-2 py-5 p-4 lg:p-0">
          {[1, 2, 3, 4, 5, 6].map((index) => {
            return (
              <div key={index} className="mx-auto animate-pulse h-80 w-96 ">
                <div className="group relative h-full  bg-gray-700 rounded-xl">
                  <div className="group-hover:flex e hidden absolute rounded-md top-0 w-full h-full  group-hover:bg-black group-hover:bg-opacity-30  justify-center items-center"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (posts?.length === 0) {
    return <NoPosts />;
  }

  return (
    <div className="lg:min-w-[60] lg:max-w-[80%] lg:mx-auto">
      <div className="grid lg:grid-cols-3  place-content-center gap-2 py-5 p-4 lg:p-0">
        {posts?.map((post) => {
          return <Post post={post} />;
        })}
      </div>
    </div>
  );
};

export default Posts;
