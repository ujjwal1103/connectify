import { useEffect, useState } from "react";

import {
  BsChat,
  BsHeart,
  BsHouseDoor,
  BsPersonCircle,
  BsPlusSquare,
  BsSearch,
} from "react-icons/bs";
import {
  FaEllipsisV,
  FaCog,
  FaQuestionCircle,
  FaPhone,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CreatePost from "../create/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/services/authSlice";
import { resetState } from "../../redux/services/postSlice";
import { resetFeedState } from "../../redux/services/feedSlice";
import Notification from "../notification/Notification";
import { socket } from "../../config/socket.io";
import SearchInput from "./components/SearchInput";
import { DarkMode } from "../../icons";
import Logo from "../../icons/Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [isOpenCreatePost, setIsOpenCreatePost] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user) {
      socket.emit("addUser", { userId: user?._id, username: user?.username });
      socket.on("getUsers", (data) => {
        console.log(data);
      });
    }
  }, [user]);

  useEffect(() => {
    socket.on("sendNotification", (data) => {
      if (data) {
        console.log("data", data);
      }
    });
  }, []);

  const toggleCreatePost = () => {
    setIsOpenCreatePost(!isOpenCreatePost);
    document.body.classList.toggle("overflow-hidden");
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleNotification = () => {
    setIsOpenNotification((prev) => !prev);
    // document.body.classList.toggle("overflow-hidden");
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".dropdown-menu-button")) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetState());
    dispatch(resetFeedState());
    localStorage.clear();
    navigate("/");
  };

  const handleDarkMode = () => {
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  };
  return (
    <header className="p-4 lg:sticky left-0 z-50 fixed bottom-0 right-0">
      <nav className="bg-violet-700 bg-opacity-70  dark:bg-opacity-70 backdrop-blur-lg p-4 flex justify-between gap-10 dark:bg-slate-700  rounded-lg sticky  ">
        <div className="hidden lg:block">
          <Logo className="fill-white" />
        </div>
        <div className="hidden lg:block">
          <SearchInput />
        </div>
        <div className="text-white flex lg:w-60  items-center justify-between w-full">
          <div>
            <Link to={"/home"}>
              <BsHouseDoor size={24} />
            </Link>
          </div>
          <div className="lg:hidden">
            <Link to={"/search"}>
              <BsSearch size={24} />
            </Link>
          </div>
          <div>
            <Link to={"/messenger"}>
              <BsChat size={24} />
            </Link>
          </div>
          <div className="h-6">
            <button onClick={toggleCreatePost}>
              <BsPlusSquare size={24} />
            </button>
          </div>
          <div onClick={toggleNotification}>
            <BsHeart size={24} />
          </div>
          <div>
            <Link to={"/profile"}>
              <BsPersonCircle size={24} />
            </Link>
          </div>

          <div className="lg:relative hidden lg:inline-block text-left dropdown-menu-button">
            <button
              onClick={toggleDropdown}
              className={`p-2 focus:outline-none ${isOpen && "bg-gray-600"}`}
            >
              <FaEllipsisV className="w-6 h-6" />
            </button>
            {isOpen && (
              <div
                onClick={handleOutsideClick}
                className="origin-top-right absolute lg:right-0 mt-2 lg:w-52 w-full  bg-white border dark:text-white dark:bg-slate-800 dark:border-slate-500/30 rounded-lg shadow-lg"
              >
                <ul className="py-1">
                  <li>
                    <Link
                      href="#"
                      className="flex gap-3 items-center dark:text-white px-4 py-2 text-gray-800 hover:bg-gray-200 dark:hover:bg-slate-700"
                    >
                      <FaCog className="mr-2" />
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="flex gap-3 items-center dark:text-white px-4 py-2 text-gray-800 hover:bg-gray-200 dark:hover:bg-slate-700"
                    >
                      <FaQuestionCircle className="mr-2" />
                      Help
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="flex gap-3 items-center dark:text-white px-4 py-2 text-gray-800 hover:bg-gray-200 dark:hover:bg-slate-700"
                    >
                      <FaPhone className="mr-2" />
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <button
                      href="#"
                      className="flex gap-3 items-center w-full dark:text-white px-4 py-2 text-gray-800 hover:bg-gray-200 dark:hover:bg-slate-700"
                      onClick={handleDarkMode}
                    >
                      <DarkMode className="mr-2" />
                      DarkMode
                    </button>
                  </li>
                  <li className="border-t border-slate-500/30"></li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex gap-3 items-center w-full   px-4 py-2 text-red-600 hover:bg-gray-200 dark:hover:bg-slate-700"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {isOpenCreatePost && <CreatePost setClose={toggleCreatePost} />}
        {isOpenNotification && <Notification setClose={toggleNotification} />}
      </nav>
    </header>
  );
};

export default Navbar;
