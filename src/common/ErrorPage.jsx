import React from "react";

const ErrorPage = ({ error }) => {
  return (
    <div className="fixed top-0 w-screen h-screen dark:bg-slate-950 z-50 bg-white  dark:text-white text-2xl flex justify-center items-center">
      Error: {error}
      <button onClick={() => window.location.reload()}>Refresh</button>
    </div>
  );
};

export default ErrorPage;
