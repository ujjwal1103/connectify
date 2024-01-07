import { useState, useEffect } from "react";
import { makeRequest } from "../config/api.config";
import { useDispatch, useSelector } from "react-redux";
import { setFeeds } from "../redux/services/feedSlice";

export const getPostsPage = async (pageParam = 1, options = {}) => {
  const response = await makeRequest.get(`/posts?page=${pageParam}`, options);
  return response;
};

const usePosts = (pageNum = 1) => {
  const { feeds, totalPages } = useSelector((state) => state.feed);
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
    if(pageNum > totalPages && totalPages !== 0) {
        setIsLoading(false)
        return
    }
    getPostsPage(pageNum, { signal })
      .then((data) => {       
        dispatch(setFeeds(data));
        setHasNextPage(Boolean(data.posts.length));
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
  }, [pageNum]);

  return { isLoading, isError, error, feeds, hasNextPage };
};

export default usePosts;
