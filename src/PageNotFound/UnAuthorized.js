import React from "react";
import { useNavigate } from "react-router-dom";
import Unauthorized from '../assets/e401.png'

const UnAuthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex justify-center flex-col items-center dark:bg-slate-950 dark:text-white ">
      <img src={Unauthorized} className=" drop-shadow-lg"/>
      <button
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
        className="text-2xl border p-2 rounded-md"
      >
        Login
      </button>
    </div>
  );
};

export default UnAuthorized;
