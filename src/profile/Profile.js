import React, { useState, useEffect, useCallback } from "react";

import EditProfile from "./editProfile/EditProfile";
import { makeRequest } from "../config/api.config";
import Posts from "./components/Posts";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/services/authSlice";
import { setUser, profileState } from "../redux/services/profileSlice";
import { resetState } from "../redux/services/postSlice";
import { resetFeedState } from "../redux/services/feedSlice";
import { useNavigate } from "react-router-dom";
import ProfileCard from "./components/ProfileCard";

const Profile = () => {
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector(profileState);
  const navigate = useNavigate();

  const toggleEdit = () => {
    setEdit((prev) => !prev);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Add smooth scrolling behavior
    });
  };

  const getUser = useCallback(async () => {
    try {
      const response = await makeRequest("/user");
      dispatch(setUser(response.user));
    } catch (error) {
      console.log("error", error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    getUser();
  }, [edit, getUser]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetState());
    dispatch(resetFeedState());
    localStorage.clear();
    navigate("/");
  };

  if (!user) {
    return <div className="w-screen h-screen fixed inset-0">loading</div>;
  }

  return (
    <div
      className=" 
    h-full  w-full flex dark:text-gray-50   lg:flex-row flex-col items-center lg:items-start"
    >
      <div className="p-2 lg:hidden bg-gray-950 mb-2 flex justify-end">
        <div className="w-fit">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className=" p-3 sticky top-2  w-[450px] flex-col lg:mx-auto flex justify-center  items-center ">
        <ProfileCard toggleEdit={toggleEdit} user={user}>
          <div className="flex justify-center items-center">
            {" "}
            <button
              onClick={toggleEdit}
              className="text-2xl border p-2 lg:w-80 border-slate-600/30  text-violet-800  dark:text-slate-100   dark:bg-gradient-to-r  dark:from-slate-950 dark:to-gray-900 font-semibold rounded-md"
            >
              Edit profile
            </button>
          </div>
        </ProfileCard>
      </div>

      <Posts />

      {edit && (
        <EditProfile user={user} setClose={toggleEdit} setUser={setUser} />
      )}
    </div>
  );
};

export default Profile;
