import { useEffect, useState, useCallback } from "react";

import { makeRequest } from "../../config/api.config";
import { Link } from "react-router-dom";
import ProfilePicture from "../../common/ProfilePicture";
import Modal from "../../shared/Modal";
import Logo from "../../icons/Logo";
import UserLoading from "../../common/loading/UserLoading";
import { tranformUrl } from "../../utils";
import { getCurrentUser } from "../../api";
import useGetUser from "../../api/apiHooks/useGetUser";

const Self = () => {
  const {user, isLoading} = useGetUser()
  const [switchLogin, setSwitchLogin] = useState(false);


  return (
    <div className="">
      {!isLoading ? (
        <div className="flex -z-50 items-center dark:bg-zinc-900 justify-between space-x-2  duration-500 bg-slate-50 shadow-lg p-2 rounded-lg w-80 mx-auto">
          <div className="flex items-center space-x-2">
            <ProfilePicture
              src={tranformUrl(user?.avatar)}
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
          <button
            onClick={(e) => setSwitchLogin(true)}
            className="text-xs bg-gradient-to-l from-sky-900 to-indigo-900 px-2 rounded-xl text-sky-100 py-1"
          >
            Switch
          </button>
        </div>
      ) : (
        <UserLoading />
      )}

      {switchLogin && (
        <Modal onClose={() => setSwitchLogin(false)}>
          <form className="dark:bg-zinc-900 w-96 h-96 p-3 flex flex-col justify-center items-center rounded-xl shadow-2xl">
            <div className="flex justify-center items-center flex-1">
              <Logo className={"dark:fill-white p-2 "} size={340} />
            </div>
            <div className="w-full dark:text-white">
              <div className="py-2">
                <input
                  type="text"
                  className="w-full bg-transparent ring-2 ring-gray-400 rounded-xl"
                  placeholder="Enter Username"
                  value="username"
                />
              </div>
              <div className="py-2">
                <input
                  type="password"
                  className="w-full bg-transparent ring-2 ring-gray-400 rounded-xl"
                  placeholder="Enter Password"
                  value="password"
                />
              </div>

              <div>
                <input
                  type="submit"
                  className="w-full bg-gradient-to-l from-sky-900 to-indigo-900 hover:from-sky-800 hover:to-indigo-800 rounded-xl my-2"
                  value={"Login"}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-l from-sky-900 to-indigo-900 hover:from-sky-800 hover:to-indigo-800 rounded-xl bg-clip-text text-transparent font-bold"
                >
                  Forgot Password
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Self;
