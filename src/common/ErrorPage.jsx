import React from "react";

const ErrorPage = ({ error }) => {
  return (
    <div className="fixed top-0 w-screen  gap-3 h-screen dark:bg-slate-950 z-50 bg-white  dark:text-white text-2xl flex justify-center items-center flex-col">
      <p>Error: {error}</p>
      <button
        className="border rounded-md p-2"
        onClick={() => window.location.reload()}
      >
        Refresh
      </button>
    </div>
  );
};

export default ErrorPage;
