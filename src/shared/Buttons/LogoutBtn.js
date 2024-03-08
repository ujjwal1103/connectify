import React from "react";
import Button from "../Components/Button";
import useResetStore from "../../hooks/useResetStore";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const  reset  = useResetStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log(reset)
    reset();
    localStorage.clear();
    navigate("/");
  };

  return (
    <Button onClick={handleLogout} unsetStyle={true}>
      Logout
    </Button>
  );
};

export default LogoutBtn;
