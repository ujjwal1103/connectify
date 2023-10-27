import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/services/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.isSuccess) {
      dispatch(login({ isAuthenticated: user.isSuccess, user: user?.user }));
    } 
  }, [dispatch]);
};
