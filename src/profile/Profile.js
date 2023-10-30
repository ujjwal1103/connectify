import React, { useState, useEffect, useCallback } from "react";
import avatar from "../assets/man.png";
import { BsPlus } from "react-icons/bs";
import { formatNumberWithKAndM } from "../utils/number-formaters";
import EditProfile from "./editProfile/EditProfile";
import { makeRequest } from "../config/api.config";
import Posts from "./components/Posts";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../redux/services/authSlice";
import Followers from "./components/Followers";
import Following from "./components/Following";
import Tabs from "./components/Tabs";
import { resetState } from "../redux/services/postSlice";
import { resetFeedState } from "../redux/services/feedSlice";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
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

  const toggleShow = () => {
    if (user?.followers.length > 0) {
      setShow((prev) => !prev);
    }
  };
  const toggleShowFollowing = () => {
    if (user?.following.length > 0) {
      setShowFollowing((prev) => !prev);
    }
  };

  const getUser = useCallback(async () => {
    try {
      const response = await makeRequest("/user");
      const data = response.data;
      dispatch(setUser(data.user));
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
    return <div className="w-screen h-screen">loading</div>;
  }

  return (
    <div
      className=" 
    bg-gray-100 h-full w-full  dark:text-gray-50 dark:bg-gradient-to-r p-2 dark:from-slate-900 dark:to-slate-950"
    >
      <div className="p-2 lg:hidden  w-full bg-gray-950 mb-2 flex justify-end">
        <div className="w-fit">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="lg:w-2/3 w-full flex-col lg:mx-auto flex justify-center lg:justify-start items-center lg:p-3">
        <div className="lg:mt-10 p-3 border-black flex flex-col lg:flex-row lg:gap-10 dark:bg-gray-800 rounded-lg lg:mb-2  dark:text-slate-100   dark:bg-gradient-to-r  dark:from-slate-950 dark:to-gray-900 shadow-lg">
          <div className="h-44 w-44 mx-auto">
            <img
              src={user?.profilePicture || avatar}
              alt=""
              className="h-44 w-44 object-cover rounded-full border"
            />
          </div>
          <div className="p-3">
            <div className="pt-6 flex gap-10 items-center lg:flex-row flex-col">
              <span className="text-2xl">{user?.username}</span>
              <button
                onClick={toggleEdit}
                className="text-2xl border p-2 lg:w-80 border-slate-600/30  text-violet-800  dark:text-slate-100   dark:bg-gradient-to-r  dark:from-slate-950 dark:to-gray-900 font-semibold rounded-md"
              >
                Edit profile
              </button>
              <button className="hidden lg:block border p-2  border-violet-950 text-violet-800 dark:bg-gray-900 font-semibold rounded-md">
                <BsPlus size={32} />
              </button>
            </div>
            <div className="flex pt-6 justify-between w-80 lg:w-auto">
              <div className="flex flex-col justify-center items-center">
                <span className="text-2xl">{user?.posts?.length || 0}</span>
                <span>Posts</span>
              </div>
              <div
                className="flex flex-col justify-center items-center cursor-pointer hover:font-semibold"
                onClick={toggleShow}
              >
                <span className="text-2xl">{user?.followers?.length || 0}</span>
                <span>Followers</span>
              </div>
              <div
                className="flex flex-col justify-center items-center cursor-pointer hover:font-semibold"
                onClick={toggleShowFollowing}
              >
                <span className="text-2xl">
                  {user && formatNumberWithKAndM(user?.following?.length || 0)}
                </span>
                <span>Following</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-4 overflow-hidden">
          <strong className="py-2">{user?.name}</strong>
          <pre className="text-xs leading-8">{user?.bio}</pre>
        </div>
      </div>
      {/* <hr className='h-1 bg-violet-700' /> */}

      <div className="w-2/3 mx-auto p-4 lg:flex gap-10 justify-center hidden ">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <img
              src={avatar}
              alt=""
              width={76}
              className="outline outline-offset-1 outline-violet-500 rounded-full"
            />

            <span>highlight</span>
          </div>
        ))}
      </div>
      <hr className="h-1 bg-violet-100 dark:bg-gray-900 " />

      <Posts />

      {edit && (
        <EditProfile user={user} setClose={toggleEdit} setUser={setUser} />
      )}
      {show && <Followers userId={user._id} setClose={toggleShow} />}
      {showFollowing && (
        <>
          <Following userId={user._id} setClose={toggleShowFollowing} />
        </>
      )}

      {(showFollowing || show) && (
        <Tabs
          userId={user._id}
          username={user.username}
          setClose={() => {
            setShowFollowing(false);
            setShow(false);
          }}
          tab={showFollowing ? "Following" : "Followers"}
        />
      )}
    </div>
  );
};

export default Profile;
