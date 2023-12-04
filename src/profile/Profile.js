import React, { useState, useEffect, useCallback } from "react";

import EditProfile from "./editProfile/EditProfile";
import { makeRequest } from "../config/api.config";
import Posts from "./components/Posts";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../redux/services/authSlice";

import { resetState } from "../redux/services/postSlice";
import { resetFeedState } from "../redux/services/feedSlice";
import { useNavigate } from "react-router-dom";

import ProfileCard from "./components/ProfileCard";
const Profile = () => {
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const toggleEdit = () => {
    setEdit((prev) => !prev);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Add smooth scrolling behavior
    });
    document.body.classList.toggle("overflow-hidden");
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
    bg-gray-100 h-full w-full dark:bg-slate-950  dark:text-gray-50 p-2 "
    >
      <div className="p-2 lg:hidden  w-full bg-gray-950 mb-2 flex justify-end">
        <div className="w-fit">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <ProfileCard toggleEdit={toggleEdit} user={user}>
        <button
          onClick={toggleEdit}
          className="text-2xl border p-2 lg:w-80 border-slate-600/30  text-violet-800  dark:text-slate-100   dark:bg-gradient-to-r  dark:from-slate-950 dark:to-gray-900 font-semibold rounded-md"
        >
          Edit profile
        </button>
      </ProfileCard>
      <hr className="h-1 bg-violet-100 dark:bg-gray-900 " />

      <Posts />

      {edit && (
        <EditProfile user={user} setClose={toggleEdit} setUser={setUser} />
      )}
    </div>
  );
};

export default Profile;
