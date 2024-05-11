import { useCallback, useEffect, useState } from "react";

const useGetQuery = ({
  fn,
  deps = [],
  onSuccess = () => {},
  onError = () => {},
}) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const queryFn = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fn();
      if (res) {
        setData(res);
        onSuccess(res);
      }
    } catch (error) {
      onError(error);
      console.log(error, "error");
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, deps);

  useEffect(() => {
    queryFn();
  }, [queryFn]);

  const refech = () => {
    queryFn();
  };

  return { data, error, isLoading, refech, setData };
};

export { useGetQuery };
