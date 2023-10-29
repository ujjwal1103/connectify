import { useEffect, useState } from "react";
import avatar from "../../assets/man.png";
import { makeRequest } from "../../config/api.config";

import { Link } from "react-router-dom";
const Self = () => {
  const [user, setUser] = useState();

  const getUser = async () => {
    try {
      const response = await makeRequest("/user");
      const data = response.data;
      setUser(data.user);
    } catch (error) {
      console.log("error", error.message)
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="">
      <div className="flex items-center dark:bg-slate-800 justify-between space-x-2 hover:scale-90 duration-500 bg-slate-50 shadow-lg  p-2 rounded-lg w-80 mx-auto">
        <div className="flex items-center space-x-2">
          <img
            className="inline-block h-12 w-12 rounded-full hover:scale-90 duration-500 object-cover"
            src={user?.profilePicture || avatar}
            alt="Dan_Abromov"
          />
          <span className="flex flex-col">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
              {user?.name}
            </span>
            <Link
              to="/profile"
              className="text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              {user?.username}
            </Link>
          </span>
        </div>
        <button className="text-xs bg-sky-500 px-2 rounded-xl text-sky-100 py-1">
          Switch
        </button>
      </div>
    </div>
  );
};

export default Self;
