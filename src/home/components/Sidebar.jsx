import React from "react";
import { useSocket } from "../../context/SocketContext";
import UsernameLink from "../../shared/UsernameLink";
import { isCurrentUser } from "../../utils/getCurrentUserId";

const Sidebar = () => {
  const { users } = useSocket();


 if(!users){
  return  <div className={(!users ? "invisible" : "visible min-h-[400px]")}>
  <aside className="hidden lg:flex  w-64 flex-col overflow-y-scroll rounded-md bg-white px-2 pt-2 dark:bg-slate-800">
    <div className=" flex flex-1 flex-col justify-between">
        NO USERS ONLINE
    </div>
  </aside>
</div>
 }
  return (
    <div className={(!users ? "invisible" : "visible min-h-[400px]")}>
      <aside className="hidden lg:flex  w-64 flex-col overflow-y-scroll rounded-md bg-white px-2 pt-2 dark:bg-slate-800">
        <div className=" flex flex-1 flex-col justify-between">
          <ul className="">
            {users?.map((u) => {
              if (!isCurrentUser(u._id)) {
                return (
                  <li
                    className="p-2 mb-2 bg-zinc-900 rounded-md flex justify-between items-center"
                    key={u._id}
                  >
                    <UsernameLink username={u?.username} />
                    <span className="text-xs">Online</span>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
