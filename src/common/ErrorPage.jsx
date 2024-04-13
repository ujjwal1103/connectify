import React from "react";

const ErrorPage = ({ error }) => {
  return (
    <div className="fixed top-0 size-screen gap-3 dark:bg-slate-950 z-50 bg-white  dark:text-white text-2xl flex-center flex-col">
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
