import React from "react";
import { OutlineLoading } from "../icons";

const Loading = () => {
  return (
    <div className="fixed top-0 w-screen h-screen dark:bg-slate-950 z-50 bg-white  dark:text-white text-2xl flex justify-center items-center">
      Loading...
      <OutlineLoading className="animate-spin" />
    </div>
  );
};

export default Loading;
