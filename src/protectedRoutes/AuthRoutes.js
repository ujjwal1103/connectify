import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const AuthRoutes = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  console.log(localStorage.getItem("user"));

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/home");
    }
  }, [user, navigate]);

  return <Outlet />;
};

export default AuthRoutes;
