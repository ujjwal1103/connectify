import React, { forwardRef, useState } from "react";
import ProfilePicture from "../../common/ProfilePicture";
import { ChevronBack, EllipsisV } from "../../icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsSelectMessages } from "../../redux/services/chatSlice";
import { motion, AnimatePresence } from "framer-motion";

const ChatHeader = ({ otherUser }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex bg-gray-50 dark:bg-zinc-950 border-b dark:border-zinc-700 relative items-center p-2">
      <Link to={"/messenger"} className="lg:hidden md:hidden">
        <ChevronBack size={24} />
      </Link>
      <ProfilePicture
        src={otherUser?.avatar}
        className="inline-block h-10 w-10 rounded-full hover:scale-90 duration-500 object-cover"
      />
      <div className="mx-2 dark:text-gray-50">
        <span className="block text-sm">
          {otherUser?.name || otherUser?.username}
        </span>
        {/* <span className="text-xs">active</span> */}
      </div>
      <div className="ml-auto px-2 relative">
        <button onClick={() => setOpen(!open)}>
          <EllipsisV />
        </button>

        <AnimatePresence>
          {open && <MenuBox setOpen={setOpen} />}
        </AnimatePresence>
      </div>

    
    </div>
  );
};

export default ChatHeader;

const MenuBox = forwardRef(({ setOpen }, ref) => {
  const dispatch = useDispatch();

  const handleSelectMessages = () => {
    dispatch(setIsSelectMessages(true));
    setOpen(false);
  };
  return (
    <motion.div
      initial={{ scale: 0, origin: "center" }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.3 }}
      ref={ref}
      className="origin-top-right absolute lg:right-0  lg:w-52 w-full top-10 bg-white border dark:text-white dark:bg-zinc-900 dark:border-zinc-500/30 rounded-lg shadow-lg z-[999]"
    >
      <ul className="py-1 ">
        <li onClick={handleSelectMessages} className="cursor-pointer">
          <span className="flex gap-3 items-center dark:text-white px-4 py-2 text-gray-800 hover:bg-gray-200 dark:hover:bg-slate-700 active:bg-red-400">
            Select messages
          </span>
        </li>
        <li>
          <span className="flex gap-3 items-center dark:text-white px-4 py-2 text-gray-800 hover:bg-gray-200 dark:hover:bg-slate-700">
            Clear Messages
          </span>
        </li>
        <li>
          <span className="flex gap-3 items-center dark:text-white px-4 py-2 text-gray-800 hover:bg-gray-200 dark:hover:bg-slate-700">
            Delete Chat
          </span>
        </li>
      </ul>
    </motion.div>
  );
});
