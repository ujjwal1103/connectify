import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SocketProvider } from "../context/SocketContext";

const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.accessToken) {
      navigate("/login", { replace: true });
    }
  }, [user?.accessToken]);

  return (
    user?.accessToken && (
      <SocketProvider>
        <Outlet />
      </SocketProvider>
    )
  );
};

export default ProtectedRoute;
