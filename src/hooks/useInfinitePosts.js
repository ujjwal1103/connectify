import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHasNext, setLoading, setPosts } from "../redux/services/postSlice";
import { getPostsPage } from "./useMyPosts";

const useInfinitePosts = (userId, username = "", postCount = 0) => {
  const { page, posts = [], loading } = useSelector((state) => state.post);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  const fetchPost = useCallback(async () => {
    if (postCount !== 0) {
      dispatch(setLoading(true));
      const res = await getPostsPage(page, userId);
      dispatch(setPosts(res.posts));
      setHasMore(res.hasNext && res.totalPages !== page);
      dispatch(setLoading(false));
    }
  }, [page, userId, username, postCount]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return { posts, loading, hasNext: hasMore, page };
};

export default useInfinitePosts;
