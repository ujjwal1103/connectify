import React, { memo } from "react";

const UserLoading = () => {
  return (
    <div className="flex">
      <div className="h-full w-96 flex dark:text-gray-50 lg:flex-row flex-col items-center lg:items-start">
        <div className="p-3 sticky top-2 w-[400px] flex-col lg:mx-auto flex justify-center  items-center ">
          <div className="p-2 h-fit w-full bg-zinc-900 rounded-xl">
            <div className="flex justify-center items-center my-3">
              <span className=" px-5  text-xl w-20 h-5 rounded-md bg-zinc-800 animate-pulse"></span>
            </div>
            <div className="flex justify-center items-center">
              <div className=" bg-zinc-800 animate-pulse rounded-full">
                <div className="h-32 w-32 object-cover rounded-full  shadow-sm" />
              </div>
            </div>
            <div className="flex justify-center items-center ">
              <span className="text-xl px-10 py-2 w-8 h-8 bg-zinc-800 animate-pulse my-2 rounded-md "></span>
            </div>
            <div className="flex gap-3 justify-center items-center">
              {[1, 2, 3].map((i) => (
                <button className=" p-2 rounded-xl w-20 bg-zinc-800 animate-pulse h-10 transition-colors delay-200"></button>
              ))}
            </div>
            <div className="grid grid-cols-3  gap-3  my-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex animate-pulse flex-col h-16 rounded-lg justify-center items-center bg-zinc-800"
                ></div>
              ))}
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

export const PostLoading = memo(({ className }) => (
  <div className={className}>

    <div className="grid lg:grid-cols-3 overflow-hidden gap-3 w-full">
      {Array(9)
        .fill(null)
        .map((_, index) => {
          return (
            <div
              key={index}
              className="bg-zinc-900 animate-pulse h-64 rounded-md"
            ></div>
          );
        })}
    </div>
  </div>
));
