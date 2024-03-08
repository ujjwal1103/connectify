import React, { useState, useEffect, useCallback } from "react";

import EditProfile from "./editProfile/EditProfile";
import { makeRequest } from "../config/api.config";
import Posts from "./components/Posts";
import { useDispatch, useSelector } from "react-redux";
import { setUser, profileState } from "../redux/services/profileSlice";

import ProfileCard from "./components/ProfileCard";
import LogoutBtn from "../shared/Buttons/LogoutBtn";
import { Edit } from "../icons";
import Modal from "../shared/Modal";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(profileState);

  const setCurrentUser = (data) => {
    dispatch(setUser(data));
  };

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
      setCurrentUser(response.user);
    } catch (error) {
      console.log("error", error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (!user) {
    return <div className="w-screen h-screen fixed inset-0">loading</div>;
  }

  return (
    <div
      className=" 
      w-full flex grid-cols-2  lg:h-page overflow-y-scroll h-post  overflow-x-hidden bg-zinc-950 p-3  gap-4 items-center  lg:items-start "
    >
      <div className=" lg:hidden bg-gray-950 mb-2 flex justify-end">
        <div className="w-fit">
          <LogoutBtn />
        </div>
      </div>
      <div className="lg:sticky top-0 w-[40%] flex-col h-full flex rounded-xl justify-center items-center ">
        <ProfileCard toggleEdit={toggleEdit} user={user} isPrivate={false}>
          <div className="flex absolute top-2 right-2 justify-center items-center">
            <button
              onClick={toggleEdit}
              className=" p-2 rounded-xl bg-[#620C45] hover:bg-[#3e092c] transition-colors delay-200"
            >
              <Edit />
            </button>
          </div>
        </ProfileCard>
      </div>

      <Posts />

      {edit && (
        <Modal
          onClose={() => setEdit(false)}
          shouldCloseOutsideClick={false}
          showCloseButton={false}
        >
          <EditProfile user={user} setUser={setCurrentUser} />
        </Modal>
      )}
    </div>
  );
};

export default Profile;
