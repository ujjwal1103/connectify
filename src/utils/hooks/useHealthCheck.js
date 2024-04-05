import { useEffect, useState } from "react";
import { makeRequest } from "../../config/api.config";

const useHealthCheck = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await makeRequest("/healthCheck");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, []);
  return { loading, error };
};

export default useHealthCheck;
