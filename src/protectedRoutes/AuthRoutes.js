import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.token) {
      navigate("/");
    }
  }, [user?.token]);
  return !localStorage.getItem("user") && <Outlet />;
};

export default AuthRoutes;
