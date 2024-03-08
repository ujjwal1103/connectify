import React from "react";
import Button from "../Components/Button";
import useResetStore from "../../hooks/useResetStore";
import { useNavigate } from "react-router-dom";

const LogoutBtn = ({children}) => {
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
      {children}
    </Button>
  );
};

export default LogoutBtn;
