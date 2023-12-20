import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatePost from "../create/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/services/authSlice";
import { resetState } from "../../redux/services/postSlice";
import { resetFeedState } from "../../redux/services/feedSlice";
import Notification from "../notification/Notification";
import { socket } from "../../config/socket.io";
import SearchInput from "./components/SearchInput";
import {
  Chat,
  Cog,
  DarkMode,
  EllipsisV,
  Heart,
  HouseDoor,
  PersonCircle,
  Phone,
  PlusSquare,
  QuestionCircle,
  Search,
  SignOutAlt,
} from "../../icons";
import Logo from "../../icons/Logo";
import { useClickOutside } from "@react-hookz/web";
import FocusTrap from "../../shared/FocusTrap";
import Modal from "../../shared/Modal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [isOpenCreatePost, setIsOpenCreatePost] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modelRef = useRef();
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
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useClickOutside(modelRef, () => setIsOpen(false));

  const toggleNotification = () => {
    setIsOpenNotification((prev) => !prev);
    // document.body.classList.toggle("overflow-hidden");
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
          <Logo className="fill-white" size={"100%"} />
        </div>
        <div className="hidden lg:block">
          <SearchInput />
        </div>
        <div className="text-white flex lg:w-60  items-center justify-between w-full">
          <div>
            <Link to={"/home"}>
              <HouseDoor size={24} />
            </Link>
          </div>
          <div className="lg:hidden">
            <Link to={"/search"}>
              <Search size={24} />
            </Link>
          </div>
          <div>
            <Link to={"/messenger"}>
              <Chat size={24} />
            </Link>
          </div>
          <div className="">
            <Link onClick={toggleCreatePost}>
              <PlusSquare size={24} />
            </Link>
          </div>
          <div onClick={toggleNotification}>
            <Heart size={24} />
          </div>
          <div>
            <Link to={"/profile"}>
              <PersonCircle size={24} />
            </Link>
          </div>

          <div className="lg:relative hidden lg:inline-block text-left dropdown-menu-button">
            <button
              onClick={toggleDropdown}
              className={`p-2 focus:outline-none ${isOpen && "text-gray-900"}`}
            >
              <EllipsisV className="w-6 h-6" />
            </button>
            {isOpen && (
              <div
                ref={modelRef}
                className="origin-top-right absolute lg:right-0 mt-2 lg:w-52 w-full  bg-white border dark:text-white dark:bg-slate-800 dark:border-slate-500/30 rounded-lg shadow-lg"
              >
                <ul className="py-1">
                  <li>
                    <Link className="flex gap-3 items-center dark:text-white px-4 py-2 text-gray-800 hover:bg-gray-200 dark:hover:bg-slate-700">
                      <Cog className="mr-2" />
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link className="flex gap-3 items-center dark:text-white px-4 py-2 text-gray-800 hover:bg-gray-200 dark:hover:bg-slate-700">
                      <QuestionCircle className="mr-2" />
                      Help
                    </Link>
                  </li>
                  <li>
                    <Link className="flex gap-3 items-center dark:text-white px-4 py-2 text-gray-800 hover:bg-gray-200 dark:hover:bg-slate-700">
                      <Phone className="mr-2" />
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <button
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
                      <SignOutAlt className="mr-2" />
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        {isOpenCreatePost && (
          // <FocusTrap>
          //
          // </FocusTrap>

          <Modal onClose={() => setIsOpenCreatePost(false)}>
            <CreatePost />
          </Modal>
        )}
        {isOpenNotification && <Notification setClose={toggleNotification} />}
      </nav>
    </header>
  );
};

export default Navbar;
