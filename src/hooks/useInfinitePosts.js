import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setPosts } from "../redux/services/postSlice";
import { getPostsPage } from "./useMyPosts";

const useInfinitePosts = (userId) => {
  const { page, posts = [], loading } = useSelector((state) => state.post);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
 
  const fetchPost = useCallback(async () => {   
      dispatch(setLoading(true));
      const res = await getPostsPage(page, userId);
      dispatch(setPosts(res.posts));
      dispatch(setLoading(false));
      setHasMore(res.pagination.hasNext);
      dispatch(setLoading(false));
  }, [page, userId, dispatch]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return { posts, loading, hasNext: hasMore, page };
};

export default useInfinitePosts;
