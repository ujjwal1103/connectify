import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.accessToken) {
      navigate("/", { replace: true });
    }
  }, [user?.accessToken]);

  return !user && <Outlet />;
};

export default AuthRoutes;
