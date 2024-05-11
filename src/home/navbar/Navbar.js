import { useState, useRef, forwardRef, useEffect, useCallback } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import CreatePost from "../create/CreatePost";

import NotificationComponent from "../notification/Notification";
import SearchInput from "./components/SearchInput";
import {
  Chat,
  Cog,
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
import { useClickOutside } from "@react-hookz/web";
import Modal from "../../shared/Modal";
import { AnimatePresence, motion } from "framer-motion";
import LogoutBtn from "../../shared/Buttons/LogoutBtn";
import ConnectifyLogoText from "../../icons/ConnectifyLogoText";
import useSocketEvents from "../../hooks/useSocketEvents";
import { useSocket } from "../../context/SocketContext";
import {
  ACCEPT_REQUEST,
  LIKE_POST,
  NEW_MESSAGE,
  NEW_REQUEST,
} from "../../utils/constant";
import { makeRequest } from "../../config/api.config";
import { BiPlus } from "react-icons/bi";
import clsx from "clsx";
import { cn } from "../../utils/helper";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [isOpenCreatePost, setIsOpenCreatePost] = useState(false);
  const location = useLocation();
  const modelRef = useRef();
  const { socket } = useSocket();
  const toggleCreatePost = () => {
    setIsOpenCreatePost(!isOpenCreatePost);
  };
  const toggleDropdown = () => {
    if (isOpen) return;

    !isOpen && setIsOpen(!isOpen);
  };

  useClickOutside(modelRef, () => setIsOpen(false));

  const toggleNotification = () => {
    setIsOpenNotification((prev) => !prev);
    setBadgeCounts({
      ...badgeCounts,
      notification: 0,
    });
  };

  useEffect(() => {
    setIsOpen(false);
    setIsOpenNotification(false);
    setIsOpenCreatePost(false);
  }, [location.pathname]);

  const [badgeCounts, setBadgeCounts] = useState({
    messages: 0,
    notification: 0,
  });
  const handleNotify = () => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification("new message");
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("New message");
          }
        });
      }
    }
  };

  useEffect(() => {
    const fetchCount = async () => {
      const rs = await makeRequest.get("/notification/count");
      setBadgeCounts((b) => ({
        ...b,
        notification: rs.notifications,
      }));
    };
    fetchCount();
  }, []);

  const handleNotifationCount = useCallback(() => {
    setBadgeCounts((b) => ({
      ...b,
      notification: badgeCounts.notification + 1,
    }));
  }, []);

  const handleMessage = useCallback(() => {
    setBadgeCounts((prev) => ({
      ...prev,
      messages: prev.messages + 1,
    }));
    handleNotify();
  }, []);

  const eventHandlers = {
    [NEW_REQUEST]: handleNotifationCount,
    [ACCEPT_REQUEST]: handleNotifationCount,
    [NEW_MESSAGE]: handleMessage,
    [LIKE_POST]: handleNotifationCount,
  };

  useSocketEvents(socket, eventHandlers);

  const hidden = location.pathname.includes("/p/") || location.pathname.includes("/comments/");

  return (
    <header
      className={cn(
        `px-3 lg:pt-3 pb-3 lg:pb-0 bg-transparent dark:shadow-lg z-[100] lg:sticky left-0  fixed bottom-0 right-0`,
        {
          "hidden lg:block": hidden,
        }
      )}
    >
      <nav className="bg-gray-200  shadow-lg backdrop-blur-lg p-2 z-30 flex justify-between gap-10 dark:bg-zinc-900  rounded-lg sticky  ">
        <Link to='/' className="hidden lg:block">
          <ConnectifyLogoText size={44} showShadow={false} />
        </Link>

        <div className="hidden lg:flex flex-1 items-center">
          <SearchInput />
        </div>
        <div className="dark:text-white  flex lg:w-60  items-center justify-between w-full">
          <div>
            <NavLink
              to={""}
              className={({ isActive, isPending }) =>
                isActive ? "text-[#620C45] font-extrabold" : ""
              }
            >
              <HouseDoor size={24} />
            </NavLink>
          </div>
          <div className="lg:hidden">
            <NavLink
              to={"/search"}
              className={({ isActive, isPending }) =>
                isActive ? "text-[#620C45] font-extrabold" : ""
              }
            >
              <Search size={24} />
            </NavLink>
          </div>
          <Badge count={badgeCounts.messages}>
            <div>
              <NavLink
                to={"/messenger"}
                state={location.pathname}
                className={({ isActive }) =>
                  isActive ? "text-[#620C45] font-extrabold" : ""
                }
              >
                <Chat size={24} />
              </NavLink>
            </div>
          </Badge>
          <div className="hidden lg:block">
            <NavLink onClick={toggleCreatePost}>
              <PlusSquare size={24} />
            </NavLink>
          </div>
          <Badge count={badgeCounts.notification}>
            <button onClick={toggleNotification} className="flex items-center">
              <Heart size={24} />
            </button>
          </Badge>
          <div>
            <NavLink
              to={"/profile"}
              className={({ isActive }) =>
                isActive ? "text-[#620C45] font-extrabold" : ""
              }
            >
              <PersonCircle size={24} />
            </NavLink>
          </div>

          <div className="lg:relative hidden lg:inline-block text-left dropdown-menu-button">
            <button
              onClick={toggleDropdown}
              disabled={isOpen}
              className={`p-2 focus:outline-none  ${
                isOpen && "text-[#620C45]"
              }`}
            >
              <EllipsisV className="w-6 h-6" />
            </button>
            <AnimatePresence>
              {isOpen && <MenuBox ref={modelRef} />}
            </AnimatePresence>
          </div>
        </div>
        <AnimatePresence>
          {isOpenCreatePost && (
            <Modal
              onClose={() => setIsOpenCreatePost(false)}
              shouldCloseOutsideClick={false}
              showCloseButton={false}
            >
              <CreatePost />
            </Modal>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isOpenNotification && (
            <Modal
              onClose={toggleNotification}
              showCloseButton={false}
              animate={false}
            >
              <NotificationComponent setClose={toggleNotification} />
            </Modal>
          )}
        </AnimatePresence>
      </nav>

      <div className="fixed lg:hidden bottom-14 right-5 shadow-2xl">
        <button
          onClick={toggleCreatePost}
          className="rounded-full bg-blue-800 size-14 flex-center"
        >
          <BiPlus size={24} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;

const Badge = ({ children, count }) => {
  return (
    <div className="relative">
      {count > 0 && (
        <span className="absolute -right-1 -top-1 text-[8px] bg-red-600 size-3 rounded-full flex justify-center items-center">
          {count}
        </span>
      )}
      {children}
    </div>
  );
};

const MenuBox = forwardRef((_, ref) => {
  return (
    <motion.div
      initial={{ scale: 0, origin: "center" }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.3 }}
      ref={ref}
      className="origin-top-right absolute lg:right-0 mt-2 lg:w-52 w-full  bg-white border dark:text-white dark:bg-zinc-900 dark:border-zinc-500/30 rounded-lg shadow-lg"
    >
      <ul className="py-1 ">
        <li>
          <NavLink
            to={"/setting"}
            className="flex gap-3 items-center dark:text-white px-4 py-2 text-gray-800 hover:bg-gray-200 dark:hover:bg-slate-700 active:bg-red-400"
          >
            <Cog className="mr-2" />
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink className="flex gap-3 items-center dark:text-white px-4 py-2 text-gray-800 hover:bg-gray-200 dark:hover:bg-slate-700">
            <QuestionCircle className="mr-2" />
            Help
          </NavLink>
        </li>
        <li>
          <NavLink className="flex gap-3 items-center dark:text-white px-4 py-2 text-gray-800 hover:bg-gray-200 dark:hover:bg-slate-700">
            <Phone className="mr-2" />
            Contact Us
          </NavLink>
        </li>
        {/* <li>
       <button
         className="flex gap-3 items-center w-full dark:text-white px-4 py-2 text-gray-800 hover:bg-gray-200 dark:hover:bg-slate-700"
         onClick={handleDarkMode}
       >
         <DarkMode className="mr-2" />
         DarkMode
       </button>
      </li> */}
        <li className="border-t border-zinc-500/30"></li>
        <li>
          <button className="flex gap-3 items-center w-full   px-4 py-2 text-red-600 hover:bg-gray-200 dark:hover:bg-slate-700">
            <SignOutAlt className="mr-2" />
            <LogoutBtn>Logout</LogoutBtn>
          </button>
        </li>
      </ul>
    </motion.div>
  );
});
