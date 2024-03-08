import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getCurrentUserAndAccessToken } from "../utils/getCurrentUserId";

const AuthRoutes = () => {
  const { user, accessToken } = getCurrentUserAndAccessToken();
  const navigate = useNavigate();

  const isLoggedIn = !!(user && accessToken);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [user, accessToken, isLoggedIn, navigate]);

  return !isLoggedIn && <Outlet />;
};

export default AuthRoutes;
