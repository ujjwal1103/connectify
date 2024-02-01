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
  useEffect(() => {
    dispatch(resetState());
  }, []);
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
      w-full flex lg:h-page overflow-y-scroll h-post  overflow-x-hidden bg-slate-950 px-4 pt-4 lg:flex-row flex-col gap-4 items-center  lg:items-start "
    >
      <div className=" lg:hidden bg-gray-950 mb-2 flex justify-end">
        <div className="w-fit">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="lg:sticky top-2 lg:w-[450px] w-72 flex-col lg:mx-auto flex rounded-xl justify-center  items-center ">
        <ProfileCard toggleEdit={toggleEdit} user={user} isPrivate={false}>
          <div className="flex justify-center items-center">
            <button
              onClick={toggleEdit}
              className=" p-2 rounded-xl   bg-blue-600 hover:bg-blue-800 transition-colors delay-200"
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
