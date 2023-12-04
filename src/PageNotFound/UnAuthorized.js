import React from "react";
import { useNavigate } from "react-router-dom";

const UnAuthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex justify-center items-center dark:bg-slate-950 dark:text-white">
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
