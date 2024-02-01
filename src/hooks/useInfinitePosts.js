import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setHasNext,
  setLoading,
  setPosts,
  resetPosts,
} from "../redux/services/postSlice";
import { getPostsPage } from "./useMyPosts";

const useInfinitePosts = (userId) => {
  const {
    page,
    posts = [],
    loading,
    hasNext,
  } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(userId, "userId is here or not??");
    dispatch(resetPosts([]));
  }, [userId]);
  useEffect(() => {
    dispatch(setLoading(true));
    const fetchPost = async () => {
      const res = await getPostsPage(page, userId);
      dispatch(setPosts(res.posts));
      dispatch(setHasNext(res.hasNext));
      dispatch(setLoading(false));
    };
    fetchPost();
    return () => {
      dispatch(setPosts([]));
      dispatch(setHasNext(false));
      dispatch(setLoading(true));
    };
  }, [page, userId]);

  return { posts, loading, hasNext, page };
};

export default useInfinitePosts;
