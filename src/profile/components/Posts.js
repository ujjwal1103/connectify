import { useCallback, useEffect } from "react";
import { makeRequest } from "../../config/api.config";
import { useDispatch, useSelector } from "react-redux";
import { setError, setPosts } from "../../redux/services/postSlice";
import NoPosts from "./NoPosts";
import Post from "../Post";
import { PostLoading } from "./UserLoading";

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
    return <PostLoading />;
  }

  if (posts?.length === 0) {
    return <NoPosts />;
  }

  // return (
  //   <div className="lg:min-w-[60] lg:max-w-[80%] lg:mx-auto">
  //     <div className="grid lg:grid-cols-3  place-content-center gap-2 py-5 p-4 lg:p-0">
  //       {posts?.map((post) => {
  //         return <Post post={post} />;
  //       })}
  //     </div>
  //   </div>
  // );
  return (
    <div className="p-5 flex-1 h-full grid lg:grid-cols-3 gap-5 place-items-center overflow-y-scroll">
      {posts.map((post) => {
        return (
          <div className=" w-full h-[270px] flex items-center rounded shadow-xl justify-center">
            <img
              src={post.imageUrl}
              alt=""
              className="object-cover w-full h-full rounded "
            />
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
