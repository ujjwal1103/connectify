import Input from "../../common/InputFields/Input";
import {
  ImageFill,
  MusicLibrary,
  OutlineLoading3Quarters,
  Send,
  VideoLibrary,
} from "../../icons";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "@react-hookz/web";
import { useSocket } from "../../context/SocketContext";
import { sendNotification } from "../../home/notification/Services";
import {
  useSendAttachmentsMutation,
  useSendMessageMutation,
} from "../../redux/services/messageApi";
import { NEW_MESSAGE } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import {
  reorderChat,
  resetSelectedMessages,
  setIsSelectMessages,
} from "../../redux/services/chatSlice";
import AudioRecorder from "./AudioRecorder";
import { BiMicrophone } from "react-icons/bi";

function blobToFile(blob, filename) {
  // Create a File object using the Blob
  const file = new File([blob], filename, {
      type: blob.type,
      lastModified: new Date().getTime(),
  });

  return file;
}

export const Loader = () => {
  return (
    <div className="flex-center">
      <motion.div
        className="w-24 h-4 bg-zinc-800 rounded-full"
        animate={{ width: "100%" }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      ></motion.div>
    </div>
  );
};

const MessageInput = ({ userId, chatId, onMessage }) => {
  const [messageText, setMessageText] = useState("");
  const [openDial, setOpenDial] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const speedDialRef = useRef();
  const { isSelectMessages, selectedMessages } = useSelector(
    (state) => state.chat
  );
  const dispatch = useDispatch();

  const { socket } = useSocket();
  const handleTextChange = (e) => {
    setMessageText(e.target.value);
  };
  const [mutate, { isLoading }] = useSendMessageMutation();
  const [mutateAttchements, { isLoading: sendingAttachments }] =
    useSendAttachmentsMutation();

  const handleSend = async () => {
    if (!messageText) return;

    const newMessage = {
      text: messageText,
      messageType: "TEXT_MESSAGE",
      to: userId,
    };
    setMessageText("");
    // const response = await makeRequest.post(`message/${chatId}`, newMessage);
    const response = await mutate({ chatId, newMessage });

    if (response?.data.isSuccess) {
      onMessage(response.data.message);
      dispatch(reorderChat(chatId))
      await sendNotification(
        userId,
        NEW_MESSAGE,
        socket,
        chatId,
        response.data.message
      );
    }
  };

  const handleSendAttachement = async (e, messageType) => {

    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("messageAttachement", files[i]);
    }
    formData.append("messageType", messageType);
    formData.append("to", userId);
    const response = await mutateAttchements({ chatId, formData });
    if (response?.data.isSuccess) {
      onMessage(response.data.message);
      dispatch(reorderChat(chatId))
      await sendNotification(
        userId,
        NEW_MESSAGE,
        socket,
        chatId,
        response.data.message
      );
    }
    setOpenDial(false);
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

  const handleClose = () => {
    dispatch(setIsSelectMessages(false));
    dispatch(resetSelectedMessages());
  };

  if (isRecording) {
    return <AudioRecorder handleClose={()=>setIsRecording(false)} handleSendRecording={(recording)=>{
       const file = blobToFile(recording, `${Date.now() + "webm"}`)
       handleSendAttachement({target:{files:[file]}}, "VOICE_MESSAGE")
    }}/>;
  }
  if (isSelectMessages) {
    return (
      <div className="py-3 px-4 h-[60px] relative flex gap-3 items-center">
        <button onClick={handleClose}>
          <IoClose size={24} />
        </button>
        <span>{selectedMessages.length} selected</span>
      </div>
    );
  }

  if (sendingAttachments) {
    return <Loader />;
  }

  return (
    <div className="p-2 relative flex gap-3 items-center">
      <Input
        className="w-full bg-zinc-900  rounded-full px-12"
        value={messageText}
        onChange={handleTextChange}
        placeholder="Type..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && messageText && e.target.value) {
            handleSend();
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
              onClick={handleSend}
              className="cursor-pointer px-3 disabled:pointer-events-none"
            >
              <Send />
            </button>
          )
        }
      />
      <div>
        <button type="button" className="" onClick={()=>setIsRecording(true)}>
          <BiMicrophone size={24}/>
        </button>
      </div>
      <AnimatePresence>
        {openDial && (
          <motion.div
            ref={speedDialRef}
            className="absolute bottom-16 left-4  flex items-center flex-col gap-2  "
          >
            <motion.label
              transition={{ delay: 0.5, duration: 0.2 }}
              variants={buttonVariants1}
              initial="hidden"
              animate="visible"
              exit="hidden"
              htmlFor="imageFile"
              className="bg-black w-10  flex justify-center items-center cursor-pointer ring-2 ring-zinc-700 h-10 rounded-full  shadow-2xl shadow-slate-700"
            >
              <ImageFill />
              <input
                type="file"
                id="imageFile"
                hidden
                multiple
                onChange={(e) => handleSendAttachement(e, "IMAGE")}
                accept="image/*, webp"
              />
            </motion.label>
            <motion.label
              transition={{ delay: 0.25, duration: 0.2 }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={buttonVariants2}
              htmlFor="audioFile"
              className="bg-black w-10  flex justify-center items-center cursor-pointer ring-2 ring-zinc-700 h-10 rounded-full  shadow-2xl shadow-slate-700"
            >
              <MusicLibrary />
              <input
                type="file"
                id="audioFile"
                hidden
                multiple
                onChange={(e) => handleSendAttachement(e, "AUDIO")}
                accept="audio/*"
              />
            </motion.label>
            <motion.label
              transition={{ delay: 0, duration: 0.2 }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              htmlFor="videoFile"
              variants={buttonVariants3}
              className="bg-black w-10  flex justify-center items-center cursor-pointer ring-2 ring-zinc-700 h-10 rounded-full  shadow-2xl shadow-slate-700"
            >
              <VideoLibrary />
              <input
                type="file"
                id="videoFile"
                hidden
                multiple
                onChange={(e) => handleSendAttachement(e, "VIDEO")}
                accept="video/*"
              />
            </motion.label>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessageInput;
