import { useSocket } from "../../context/SocketContext";
import UsernameLink from "../../shared/UsernameLink";
import { isCurrentUser } from "../../utils/getCurrentUserId";

const Sidebar = () => {
  const { users } = useSocket();

  if (!users) {
    return (
      <div className={!users ? "invisible" : "visible min-h-[400px]"}>
        <aside className="hidden lg:flex  w-64 flex-col overflow-y-scroll rounded-md bg-white px-2 pt-2 dark:bg-slate-800">
          <div className=" flex flex-1 flex-col justify-between">
            NO USERS ONLINE
          </div>
        </aside>
      </div>
    );
  }
  return (
    <div className={!users ? "hidden  " : "min-h-[400px] "}>
      <aside className="hidden  lg:flex  w-64 flex-col overflow-y-scroll rounded-md bg-white  dark:bg-zinc-800">
        <div className=" flex flex-1 flex-col justify-between">
          <ul className="">
            {users?.map((u) => {
              if (!isCurrentUser(u._id)) {
                return (
                  <li
                    className="p-2 border-b-[0.5px] border-zinc-700 last:border-none flex justify-between items-center"
                    key={u._id}
                  >
                    <UsernameLink username={u?.username} />
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  </li>
                );
              }

              return ''
            }
            )}
           
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
