import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SocketProvider } from "../context/SocketContext";
import { getCurrentUserAndAccessToken } from "../utils/getCurrentUserId";

const ProtectedRoute = () => {
  const { user, accessToken } = getCurrentUserAndAccessToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!(user && accessToken)) {
      navigate("/login", { replace: true });
    }
  }, [user, accessToken, navigate]);

  return (
    user && accessToken && (
      <SocketProvider>
        <Outlet />
      </SocketProvider>
    )
  );
};

export default ProtectedRoute;
