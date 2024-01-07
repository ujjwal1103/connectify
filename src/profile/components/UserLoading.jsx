import React from "react";

const UserLoading = () => {
  return (
    <div className="flex ">
      <div
        className=" 
h-full  w-96 flex dark:text-gray-50   lg:flex-row flex-col items-center lg:items-start"
      >
        <div className=" p-3 sticky top-2  w-[450px] flex-col lg:mx-auto flex justify-center  items-center ">
          <div className="p-2 h-fit w-full bg-slate-900 rounded-xl">
            <div className="flex justify-center items-center my-3">
              <span className=" px-5  text-xl w-20 h-5 rounded-md bg-slate-800 animate-pulse"></span>
            </div>
            <div className="flex justify-center items-center">
              <div className=" bg-slate-800 animate-pulse rounded-full">
                <div className="h-32 w-32 object-cover rounded-full  shadow-sm" />
              </div>
            </div>
            <div className="flex justify-center items-center ">
              <span className="text-xl px-10 py-2 w-8 h-8 bg-slate-800 animate-pulse my-2 rounded-md "></span>
            </div>
            <div className="flex gap-3 justify-center items-center">
              {[1, 2, 3].map((i) => (
                <button className=" p-2 rounded-xl w-20 bg-slate-800 animate-pulse h-10 transition-colors delay-200"></button>
              ))}
            </div>
            <div className="grid grid-cols-3  gap-3  my-2">
              {[1, 2, 3].map((i) => (
                <div className="flex animate-pulse flex-col h-16 rounded-lg justify-center items-center bg-slate-800"></div>
              ))}{" "}
            </div>
            <div>
              <div className="text-xs">
                <p></p>
                <pre></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PostLoading />
    </div>
  );
};

export default UserLoading;

export const PostLoading = () => (
  <div className="p-3 flex-1 h-page overflow-hidden">
    <div className="grid lg:grid-cols-3 gap-5 w-full">
      {[1, 2, 3, 4, 5, 6].map((index) => {
        return (
          <div
            key={index}
            className=" bg-slate-800 animate-pulse w-52 h-52  rounded-md "
          ></div>
        );
      })}
    </div>
  </div>
);
