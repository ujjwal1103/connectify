import Input from "../../common/InputFields/Input";
import { ImageFill, OutlineLoading3Quarters, Send } from "../../icons";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setMessageChatId } from "../../redux/services/chatSlice";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "@react-hookz/web";
import { useSocket } from "../../context/SocketContext";
import { sendNotification } from "../../home/notification/Services";
import { useSendMessageMutation } from "../../redux/services/messageApi";
import { NEW_MESSAGE } from "../../utils/constant";

const MessageInput = ({ userId, chatId, onMessage }) => {
  const [messageText, setMessageText] = useState("");
  const [openDial, setOpenDial] = useState(false);
  const speedDialRef = useRef();
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const handleTextChange = (e) => {
    setMessageText(e.target.value);
  };
  const [mutate, { isLoading }] = useSendMessageMutation();
  const handleSend = async () => {
    setMessageText("");
    if (!messageText) return;
    const newMessage = {
      text: messageText,
      to: userId,
    };

    // const response = await makeRequest.post(`message/${chatId}`, newMessage);
    const response = await mutate({ chatId, newMessage });

    if (response?.data.isSuccess) {
      await sendNotification(userId, NEW_MESSAGE, socket, chatId, newMessage);
      dispatch(setMessageChatId(response.chatId));
    }
  };

  const buttonVariants1 = {
    hidden: { opacity: 0, scale: 0, y: 100 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };
  const buttonVariants2 = {
    hidden: { opacity: 0, scale: 0, y: 100 },
    visible: { opacity: 1, scale: 1, y: 5 },
  };
  const buttonVariants3 = {
    hidden: { opacity: 0, scale: 0, y: 100 },
    visible: { opacity: 1, scale: 1, y: 10 },
  };

  useClickOutside(speedDialRef, () => {
    setOpenDial(false);
  });

  return (
    <div className="p-2 relative flex gap-3 items-center">
      <Input
        className="w-full bg-zinc-900  rounded-full px-12"
        value={messageText}
        onChange={handleTextChange}
        placeholder="Type..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && messageText && e.target.value) {
            handleSend()
          }
        }}
        prefix={
          <button
            className="cursor-pointer px-3"
            onClick={() => setOpenDial((prev) => !prev)}
          >
            <ImageFill />
          </button>
        }
        sufix={
          isLoading ? (
            <button className="cursor-pointer px-3 disabled:pointer-events-none">
              <OutlineLoading3Quarters className="animate-spin" />
            </button>
          ) : (
            <button
              disabled={!messageText}
              className="cursor-pointer px-3 disabled:pointer-events-none"
            >
              <Send onClick={handleSend} />
            </button>
          )
        }
      />
      <AnimatePresence>
        {openDial && (
          <motion.div
            ref={speedDialRef}
            className="absolute bottom-16 left-4  flex items-center flex-col gap-2  "
          >
            <motion.button
              transition={{ delay: 0.5, duration: 0.5 }}
              variants={buttonVariants1}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="bg-black w-10  ring-2 ring-zinc-700 h-10 rounded-full  shadow-2xl shadow-slate-700"
            ></motion.button>
            <motion.button
              transition={{ delay: 0.25, duration: 0.5 }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={buttonVariants2}
              className="bg-zinc-950  ring-2 ring-zinc-700 w-10 h-10 rounded-full  shadow-2xl shadow-slate-700"
            >
              2
            </motion.button>
            <motion.button
              transition={{ delay: 0, duration: 0.5 }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={buttonVariants3}
              className="bg-black w-10  ring-2 ring-zinc-700 h-10 rounded-full  shadow-2xl shadow-slate-700"
            >
              3
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessageInput;
