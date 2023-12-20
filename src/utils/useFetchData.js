import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeRequest } from "../config/api.config";

export const useFetchData = (endpoint, key, stateName, setAction, setError) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state[stateName]);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await makeRequest.get(endpoint);
      if (res?.isSuccess) {
        dispatch(setAction(res[key]));
      }
    } catch (error) {
      if (setError) {
        dispatch(setError(error?.message || "something went wrong"));
      }
    }
  }, [dispatch, endpoint, key, setAction, setError]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return state;
};
