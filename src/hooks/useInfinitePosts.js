import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHasNext, setLoading, setPosts } from "../redux/services/postSlice";
import { getPostsPage } from "./useMyPosts";

const useInfinitePosts = (userId, username = "", postCount = 0) => {
  const {
    page,
    posts = [],
    loading,
    hasNext,
  } = useSelector((state) => state.post);
  const [hasMore, setHasMore] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchPost = async () => {
      const res = await getPostsPage(page, userId);
      dispatch(setPosts(res.posts));
      dispatch(setHasNext(res.hasNext && res.totalPages !== page));
      dispatch(setLoading(false));
      setHasMore(res.totalPages !== page)
    };
    if (postCount !== 0 || hasMore) {
      fetchPost();
    }
    dispatch(setLoading(false));
  }, [page, userId, username, postCount]);

  return { posts, loading, hasNext, page };
};

export default useInfinitePosts;
