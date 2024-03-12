import React, { useEffect, useState } from "react";
import { makeRequest } from "../../config/api.config";

const useHealthCheck = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await makeRequest("/healthCheck");
      setLoading(false);
    };

    fetchData();
  }, []);
  return { loading };
};

export default useHealthCheck;
