const UserLoading = () => (
  <div className="flex items-center  dark:bg-zinc-900  justify-between space-x-2 hover:scale-90 duration-500 bg-slate-50 shadow-lg  p-2 rounded-lg w-80 mx-auto">
    <div className="flex items-center space-x-2">
      <div className="w-12 h-12 bg-zinc-950 rounded-full">
       
      </div>
      <span className="flex flex-col gap-2">
        <span className=" text-gray-900 w-24 h-5 dark:bg-zinc-950 rounded-xl  dark:text-gray-50"></span>
        <span className=" text-gray-900 w-20 h-3 dark:bg-zinc-950 rounded-xl dark:text-gray-50"></span>
      </span>
    </div>
    <button className="text-xs bg-zinc-950 w-12 h-6  px-2 rounded-xl text-sky-100 py-1"></button>
  </div>
);

export default UserLoading;
