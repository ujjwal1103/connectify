import React from 'react'


    const Loading = () => {
        return (
          <div className="flex items-center dark:bg-slate-800 mb-2 w-[95%] mx-auto justify-between space-x-2 hover:scale-90 duration-500 bg-slate-50 shadow-lg  p-2 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-zinc-950 rounded-full"></div>
              <span className="flex flex-col gap-2">
                <span className=" text-gray-900 w-24 h-5 dark:bg-zinc-950  dark:text-gray-50"></span>
                <span className=" text-gray-900 w-20 h-3 dark:bg-zinc-950  dark:text-gray-50"></span>
              </span>
            </div>
            <button className="text-xs bg-zinc-950 w-12 h-6  px-2 rounded-xl text-sky-100 py-1"></button>
          </div>
        );
      };
      

export default Loading
