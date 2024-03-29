import { useState, useEffect } from "react";
import { makeRequest } from "../config/api.config";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/services/postSlice";

export const getPostsPage = async (page = 1, userId, options = {}) => {
  const response = await makeRequest.get(
    `/posts/${userId || "user"}?page=${page}&limit=6`,
    options
  );
  return response;
};

const useMyPosts = (pageNum = 1, userId) => {
  const { posts, totalPages } = useSelector((state) => state.post);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);
  const dispatch = useDispatch();

  

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;
    if (pageNum > totalPages && totalPages !== 0) {
      setIsLoading(false);
      return;
    }
    getPostsPage(pageNum, userId, { signal })
      .then((data) => {
        dispatch(setPosts(data));
        setHasNextPage(Boolean(data.hasNextPage));
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: e.message });
      });
    return () => {
      controller.abort();
    };

  }, [pageNum, userId, dispatch, isLoading,totalPages]);

  return {
    isLoading,
    isError,
    error,
    posts,
    hasNextPage,
    emptyPosts: posts?.length === 0,
  };
};

export default useMyPosts;
