import React, { memo, useRef, useState, useEffect, useCallback } from "react";
import { useChatSlice } from "../../redux/services/chatSlice";
import { DotsNine } from "../../icons";
import ProfilePicture from "../../common/ProfilePicture";
import { useNavigate, useParams } from "react-router-dom";
import { isCurrentUser } from "../../utils/getCurrentUserId";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "@react-hookz/web";
import { createPortal } from "react-dom";
import { deleteConversation } from "../../api";

const SingleChat = ({ chat, index }) => {
  const [options, setOptions] = useState(false);
  const [ele, setEle] = useState({});
  const { chatId } = useParams();
  const { selectedChat, setSelectedChat, removeChat } = useChatSlice();

  const navigate = useNavigate();
  
  const modalRef = useRef();

  const selectThisChat = () => {
    if (selectedChat?._id !== chat._id || !chatId) {
      setSelectedChat(chat);
      navigate(`/messenger/${chat._id}`);
    }
  };

  const handleOptions = (e) => {
    setOptions((prev) => !prev);
  };

  const handleDeleteChat = useCallback(async () => {
    const chatId = chat?._id;
    setOptions(false);
    removeChat(chatId);
    navigate("/messenger");
    await deleteConversation(chatId);
  });

  useClickOutside(modalRef, handleOptions);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: "-20%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 * index }}
        style={{ zIndex: 10 }}
        exit={{
          opacity: 0,
          y: "-20%",
          animationDirection: "forward",
          transition: { duration: 0.3, delay: 0 },
        }}
        onClick={selectThisChat}
        className={`w-full flex gap-4 p-2 relative animate-fade-up ${
          selectedChat?._id === chat._id && "dark:bg-zinc-800 bg-gray-300"
        } dark:hover:bg-zinc-900 hover:bg-gray-300 items-center hover:z-10 dark:text-gray-50 border-b-[0.5px] cursor-pointer dark:border-zinc-800 border-gray-200 last:border-0`}
      >
        <ProfilePicture
          src={chat?.friend?.avatar}
          className="inline-block lg:size-10 size-8 rounded-full hover:scale-90 duration-500 object-cover"
        />
        <div className="flex-1">
          <h4 className="font-semibold lg:text-base text-xs">
            {chat?.friend?.username}
          </h4>
          {chat?.lastMessage && !isCurrentUser(chat?.lastMessage?.from) && (
            <span className="text-sm overflow-ellipsis text-gray-500 line-clamp-1">
              {chat.lastMessage?.messageType === "TEXT_MESSAGE"
                ? chat?.lastMessage?.text
                : "Attchment"}
            </span>
          )}
        </div>
        {chat?.unreadCount && (
          <div className="w-5 h-5 flex justify-center items-center rounded-full bg-green-700">
            <span className="text-sm text-white">{}</span>
          </div>
        )}

        <div
          className="w-5 h-5 flex  justify-center items-center text-black"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => {
              setEle(e.target.getBoundingClientRect());
              setOptions(true);
            }}
          >
            <span title="More options">
              <DotsNine className="dark:fill-zinc-200 fill-zinc-950" />
            </span>
          </button>
        </div>
        <AnimatePresence>
          {options && (
            <OptionsMenu isVisible={options} buttonPosition={ele}>
              <motion.div
                className="dark:bg-zinc-900 bg-gray-50  x-10 shadow-2xl origin-bottom-right p-1 rounded-md z-[999] animate-fade-out "
                ref={modalRef}
              >
                <ul className="text-sm z-10 lg:w-28 w-24 text-center">
                  <li className="dark:text-gray-50 rounded-md dark:hover:bg-zinc-800 hover:bg-gray-200 hover:shadow-md transition-colors duration-300 ease-in-out">
                    <button
                      onClick={() => {
                        setOptions(false);
                      }}
                      className="lg:py-2 py-1 text-xs w-full rounded-md"
                    >
                      Archive
                    </button>
                  </li>
                  <li className="dark:text-gray-50 rounded-md dark:hover:bg-zinc-800 hover:bg-gray-200 hover:shadow-md transition-colors duration-300 ease-in-out">
                    <button
                      onClick={handleDeleteChat}
                      className="lg:py-2 py-1   w-full rounded-md"
                    >
                      Delete
                    </button>
                  </li>
                  <li className="dark:text-gray-50 rounded-md dark:hover:bg-zinc-800 hover:bg-gray-200 hover:shadow-md transition-colors duration-300 ease-in-out">
                    <button
                      onClick={() => {
                        setOptions(false);
                      }}
                      className="lg:py-2 py-1  w-full rounded-md"
                    >
                      Mute
                    </button>
                  </li>
                </ul>
              </motion.div>
            </OptionsMenu>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default memo(SingleChat);

const OptionsMenu = ({ isVisible, buttonPosition, children }) => {
  const menuRef = useRef(null);
  const [menuTop, setMenuTop] = useState(null);
  const [menuLeft, setMenuLeft] = useState(null);

  useEffect(() => {
    if (isVisible && buttonPosition) {
      const viewportHeight = window.innerHeight;

      const viewportWidth = window.innerWidth;
      const menuHeight = menuRef.current.offsetHeight;
      const menuWidth = menuRef.current.offsetWidth;
      const buttonBottom = buttonPosition.top + buttonPosition.height;

      // Check if the menu goes beyond the viewport bottom
      if (buttonBottom + menuHeight > viewportHeight) {
        // Calculate the new top position to open upwards
        setMenuTop(buttonPosition.top - menuHeight);
      } else {
        // Normal positioning below the button
        setMenuTop(buttonBottom);
      }

      if (buttonPosition.left + menuWidth > viewportWidth) {
        // Calculate the new left position to align the menu within the viewport
        setMenuLeft(viewportWidth - menuWidth);
      } else {
        // Normal positioning aligned with the button
        setMenuLeft(buttonPosition.left);
      }
    }
  }, [isVisible, buttonPosition]);

  if (!isVisible) {
    return null;
  }

  const style = {
    position: "absolute",
    top: `${menuTop}px`,
    left: `${menuLeft}px`,
    zIndex: 100,
  };

  return createPortal(
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, y: "-20%" }}
      whileInView={{ opacity: 1, y: 0 }}
      // transition={{ delay: 0 }}

      exit={{ opacity: 0, y: "-20%", animationDirection: "forward" }}
      style={style}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </motion.div>,
    document.body // Render options menu in the body element
  );
};

export { OptionsMenu };
