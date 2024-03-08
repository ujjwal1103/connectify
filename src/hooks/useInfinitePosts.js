import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHasNext, setLoading, setPosts } from "../redux/services/postSlice";
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
    dispatch(setLoading(true));
    const fetchPost = async () => {
      const res = await getPostsPage(page, userId);
      dispatch(setPosts(res.posts));
      dispatch(setHasNext(res.hasNext));
      dispatch(setLoading(false));
    };
    fetchPost();
  }, [page, userId, dispatch]);

  return { posts, loading, hasNext, page };
};

export default useInfinitePosts;
