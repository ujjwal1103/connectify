import { useEffect, useState, useCallback } from "react";
import avatar from "../../assets/man.png";
import { makeRequest } from "../../config/api.config";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ProfilePicture from "../../common/ProfilePicture";

const Self = () => {
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const getUser = useCallback(async () => {
    try {
      const response = await makeRequest("/user");
      setUser(response.user);
      dispatch(setUser(response.user));
    } catch (error) {
      console.log("error", error);
    }
  }, [dispatch]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className="">
      <div className="flex items-center dark:bg-slate-800 justify-between space-x-2 hover:scale-90 duration-500 bg-slate-50 shadow-lg  p-2 rounded-lg w-80 mx-auto">
        <div className="flex items-center space-x-2">
          <ProfilePicture
            url={user?.profilePicture}
            className="inline-block h-12 w-12 rounded-full hover:scale-90 duration-500 object-cover"
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
