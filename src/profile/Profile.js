import React, { useState, useEffect, useCallback, useRef } from "react";

import EditProfile from "./editProfile/EditProfile";
import { makeRequest } from "../config/api.config";
import Posts from "./components/Posts";
import { useDispatch, useSelector } from "react-redux";
import { setUser, profileState } from "../redux/services/profileSlice";

import ProfileCard from "./components/ProfileCard";
import LogoutBtn from "../shared/Buttons/LogoutBtn";
import { Edit } from "../icons";
import Modal from "../shared/Modal";
import { BiLogOut } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { useClickOutside } from "@react-hookz/web";
import { AnimatePresence, motion } from "framer-motion";
const Profile = () => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(profileState);
  const [openDrawer, setOpenDrawer] = useState(false);
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
      w-full flex lg:h-page overflow-y-scroll h-page  overflow-x-hidden bg-zinc-950 p-3 lg:flex-row flex-col gap-4 items-center  lg:items-start "
    >
      <div className="lg:sticky top-0 left-0 lg:w-[400px] w-72 flex-col lg:mx-auto flex rounded-xl justify-center  items-center">
        <ProfileCard toggleEdit={toggleEdit} user={user} isPrivate={false}>
          <div className="flex absolute top-2 left-2 justify-center items-center lg:hidden ">
            <button
              onClick={() => setOpenDrawer(true)}
              className=" p-2 rounded-xl bg-[#620C45] hover:bg-[#3e092c] transition-colors delay-200"
            >
              <FiSettings />
            </button>
          </div>
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
      <AnimatePresence>
        {openDrawer && <Drawer onClose={() => setOpenDrawer(false)} />}
      </AnimatePresence>
    </div>
  );
};

const Drawer = ({ onClose }) => {
  const drawerVarient = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <div className="fixed lg:hidden  flex justify-end h-full  top-0 z-[1000] w-full bg-black bg-opacity-50 right-0">
      <div className="flex-1 bg-transparent " onClick={onClose} />
      <motion.div
        variants={drawerVarient}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.2 }}
        exit={"hidden"}
        className="flex-1 dark:bg-zinc-950 bg-white"
      >
        <ul className="p-2">
          <li className="px-2 py-1 flex items-center gap-3 text-xl ">
            <span>
              <BiLogOut size={24}/>
            </span>
            <LogoutBtn>Logout</LogoutBtn>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Profile;
