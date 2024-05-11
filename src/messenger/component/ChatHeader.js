import React, { forwardRef, useRef, useState } from "react";
import ProfilePicture from "../../common/ProfilePicture";
import { ChevronBack, EllipsisV } from "../../icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setIsSelectMessages,
  useChatSlice,
} from "../../redux/services/chatSlice";
import { motion, AnimatePresence } from "framer-motion";
import { useClickOutside } from "@react-hookz/web";
import useAleart from "../../utils/hooks/useAleart";
import { deleteConversation } from "../../api";
import { useIsUserOnlineQuery } from "../../redux/services/messageApi";

const modalOptions = {
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!",
};

const deleteSuccessOptions = {
  title: "Deleted!",
  text: "Your file has been deleted.",
  icon: "success",
};

const ChatHeader = ({ otherUser }) => {
  const [open, setOpen] = useState(false);

  const menuRef = useRef();

  useClickOutside(menuRef, () => setOpen(false));

  const { data } = useIsUserOnlineQuery(otherUser._id, {
    pollingInterval:20000,
  });

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
        {data?.isOnline && <span className="text-xs">active</span>}
      </div>
      <div className="ml-auto px-2 relative">
        <button onClick={() => setOpen(true)} disabled={open}>
          <EllipsisV />
        </button>

        <AnimatePresence mode="wait">
          {open && <MenuBox setOpen={setOpen} ref={menuRef} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatHeader;

const MenuBox = forwardRef(({ setOpen }, ref) => {
  const dispatch = useDispatch();
  const { confirmModal } = useAleart();
  const navigate = useNavigate();
  const { chatId } = useParams();
  const { removeChat } = useChatSlice();
  const handleSelectMessages = () => {
    dispatch(setIsSelectMessages(true));
    setOpen(false);
  };

  const handleClearChat = async () => {
    setOpen(false);
    const result = await confirmModal(modalOptions);

    if (result.isConfirmed) {
      removeChat(chatId);
      await deleteConversation(chatId);
      confirmModal(deleteSuccessOptions);
      navigate("/messenger");
    }
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.3 }}
      ref={ref}
      className="origin-top-right  absolute right-4 w-52  top-5  bg-white border dark:text-white dark:bg-zinc-900 dark:border-zinc-500/30 rounded-lg shadow-lg z-[999]"
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
        <li onClick={handleClearChat}>
          <span className="flex gap-3 items-center dark:text-white px-4 py-2 text-gray-800 hover:bg-gray-200 dark:hover:bg-slate-700">
            Delete Chat
          </span>
        </li>
      </ul>
    </motion.div>
  );
});
