import React, { memo, useState, useEffect, useRef } from "react";
import { getReadableTime } from "../../utils/groupMessagesByDate";
import { Check, DoubleCheckIcon, FaPause, FaPlay, HeadSet } from "../../icons";
import { tranformUrl } from "../../utils";
import Modal from "../../shared/Modal";
import { ImageComponent } from "../../profile/components/Post";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMessage } from "../../redux/services/chatSlice";
import { useWaveProgress } from "../../hooks/useWaveProgress";
import { AnimatePresence } from "framer-motion";
import clsx from "clsx";
const Message = ({
  currentUserMessage,
  seen: allSeen,
  isMessageSelected,
  message: { text, createdAt, seen, messageType, attachments, _id },
}) => {
  const { isSelectMessages } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const handleSelectMessage = (e) => {
    dispatch(setSelectedMessage(_id));
  };

  const className = clsx(
    "w-full transition-colors duration-500 flex",
    isSelectMessages && "hover:bg-zinc-950 hover:bg-opacity-30",
    isMessageSelected && "bg-zinc-950 bg-opacity-30"
  );

  if (messageType === "IMAGE") {
    return (
      <ImageMessage
        attachments={attachments}
        className={className}
        isSelectMessages={isSelectMessages}
        isMessageSelected={isMessageSelected}
        handleSelectMessage={handleSelectMessage}
        currentUserMessage={currentUserMessage}
        createdAt={createdAt}
        seen={seen}
        allSeen={allSeen}
      />
    );
  }
  if (["AUDIO", "VOICE_MESSAGE"].includes(messageType)) {
    return (
      <AudioMessage
        attachments={attachments}
        className={className}
        isSelectMessages={isSelectMessages}
        isMessageSelected={isMessageSelected}
        handleSelectMessage={handleSelectMessage}
        currentUserMessage={currentUserMessage}
        createdAt={createdAt}
        seen={seen}
        allSeen={allSeen}
      />
    );
  }
  if (messageType === "VIDEO") {
    return (
      <VideoMessage
        attachments={attachments}
        className={className}
        isSelectMessages={isSelectMessages}
        isMessageSelected={isMessageSelected}
        handleSelectMessage={handleSelectMessage}
        currentUserMessage={currentUserMessage}
        createdAt={createdAt}
        seen={seen}
        allSeen={allSeen}
      />
    );
  }

  return (
    <TextMessage
      isSelectMessages={isSelectMessages}
      className={className}
      isMessageSelected={isMessageSelected}
      handleSelectMessage={handleSelectMessage}
      currentUserMessage={currentUserMessage}
      text={text}
      createdAt={createdAt}
      seen={seen}
      allSeen={allSeen}
    />
  );
};

export default memo(Message);

const AudioMessage = memo(
  ({
    isSelectMessages,
    isMessageSelected,
    handleSelectMessage,
    currentUserMessage,
    createdAt,
    seen,
    allSeen,
    attachments,
  }) => {
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    return (
      <div
        className={` w-full  ${
          isSelectMessages && "hover:bg-zinc-950 hover:bg-opacity-30"
        }  ${
          isMessageSelected && "bg-zinc-950 bg-opacity-30"
        } transition-colors duration-500 flex`}
      >
        {isSelectMessages && (
          <div className="flex-center p-4">
            <input
              type="checkbox"
              className="size-4 dark:bg-black"
              checked={isMessageSelected}
              onChange={handleSelectMessage}
            />
          </div>
        )}
        <div
          className={`
      max-w-md w-fit p-2 duration-700 transition-all rounded-xl ${
        currentUserMessage
          ? "self-end bg-zinc-800 rounded-br-none ml-auto"
          : "    bg-black rounded-bl-none"
      } text-gray-50 shadow-2xl
    `}
        >
          <div className="overflow-hidden break-words">
            <AudioPlayer
              src={attachments[0]}
              getDurationAndCurrentTime={(duration, currentTime) => {
                setDuration(duration);
                setCurrentTime(currentTime);
              }}
            />
          </div>

          <div className="flex text-[10px] justify-end items-center w-fit float-right flex-col text-right text-gray-300">
            <span className="flex items-center gap-3">
              <div className="text-[10px]">
                <span>{currentTime}</span> / <span>{duration}</span>
              </div>
              {getReadableTime(createdAt)}
              {currentUserMessage &&
                (seen || allSeen ? (
                  <DoubleCheckIcon className="text-blue-500" />
                ) : (
                  <Check />
                ))}
            </span>
          </div>
        </div>
      </div>
    );
  }
);
const VideoMessage = ({
  isSelectMessages,
  className,
  isMessageSelected,
  handleSelectMessage,
  currentUserMessage,
  createdAt,
  seen,
  allSeen,
  attachments,
}) => {
  const videoRef = useRef();
  const [previewImage, setPreviewImage] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const playPause = () => {
    const video = videoRef.current;
    console.dir(video);
    if (video?.paused) {
      setIsPlaying(true);
      video.play();
    } else {
      video?.pause();
      setIsPlaying(false);
    }
  };
  return (
    <div className={className}>
      {isSelectMessages && (
        <div className="flex-center p-4">
          <input
            type="checkbox"
            className="size-4 dark:bg-black"
            checked={isMessageSelected}
            onChange={handleSelectMessage}
          />
        </div>
      )}
      <div
        className={`
      
      max-w-md w-fit p-2 duration-700 transition-all rounded-xl ${
        currentUserMessage
          ? "self-end bg-zinc-800 rounded-br-none ml-auto"
          : "    bg-black rounded-bl-none"
      } text-gray-50 shadow-2xl relative
    `}
      >
        <div className="overflow-hidden break-words">
          <button
            onClick={playPause}
            className=" text-white font-bold py-2 px-4 rounded absolute top-4 left-4 z-50"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <video
            id="video1"
            width="420"
            ref={videoRef}
            className="rounded-xl"
            onClick={() => setPreviewImage(attachments[0])}
          >
            <source src={attachments[0]} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
        </div>

        <div className="absolute bottom-3 right-3 flex text-[10px] justify-end items-center w-fit float-right flex-col text-right text-gray-300">
          <span className="flex items-center gap-3">
            {getReadableTime(createdAt)}
            {currentUserMessage &&
              (seen || allSeen ? (
                <DoubleCheckIcon className="text-blue-500" />
              ) : (
                <Check />
              ))}
          </span>
        </div>
      </div>
      <AnimatePresence>
        {previewImage && (
          <Modal onClose={() => setPreviewImage()} animate={false}>
            <div className="w-screen h-dvh p-10 flex-center">
              <video
                id="video1"
                controls
                controlslist="nofullscreen nodownload noremoteplayback noplaybackrate foobar"
                ref={videoRef}
                className="rounded-xl"
                onClick={() => setPreviewImage(attachments[0])}
              >
                <source src={attachments[0]} type="video/mp4" />
              </video>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};
const TextMessage = ({
  isSelectMessages,
  isMessageSelected,
  handleSelectMessage,
  currentUserMessage,
  text,
  createdAt,
  seen,
  allSeen,
  className,
}) => {
  const [showMore, setShowMore] = useState(false);
  const messageLength = text?.length;
  const longMessage = messageLength > 200 && messageLength - 200 > 250;

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className={className}>
      {isSelectMessages && (
        <div className="flex-center p-4">
          <input
            type="checkbox"
            className="size-4 dark:bg-black"
            checked={isMessageSelected}
            onChange={handleSelectMessage}
          />
        </div>
      )}
      <div
        className={`
    max-w-md w-fit p-2 duration-700 transition-all rounded-xl ${
      currentUserMessage
        ? "self-end bg-zinc-800 rounded-br-none ml-auto"
        : "    bg-black rounded-bl-none"
    } text-gray-50 shadow-2xl
  `}
      >
        <div className="overflow-hidden break-words">
          {showMore ? text : text?.slice(0, 300) + (longMessage ? "..." : "")}
        </div>

        <div className="flex text-[10px] w-full justify-end items-center  float-right flex-col text-right text-gray-300">
          {longMessage && (
            <button
              onClick={toggleShowMore}
              className="text-[14px] font-semibold p-1 text-blue-500 rounded-2xl self-start"
            >
              {showMore ? "Read Less" : "Read More"}
            </button>
          )}
          <span className="flex items-center gap-3 self-end">
            {getReadableTime(createdAt)}{" "}
            {currentUserMessage &&
              (seen || allSeen ? (
                <DoubleCheckIcon className="text-blue-500" />
              ) : (
                <Check />
              ))}
          </span>
        </div>
      </div>
    </div>
  );
};
const ImageMessage = ({
  isSelectMessages,
  isMessageSelected,
  handleSelectMessage,
  currentUserMessage,
  createdAt,
  seen,
  allSeen,
  attachments,
  className,
}) => {
  const [previewImage, setPreviewImage] = useState();
  return (
    <div className={className}>
      {isSelectMessages && (
        <div className="flex-center p-4">
          <input
            type="checkbox"
            className="size-4 dark:bg-black"
            checked={isMessageSelected}
            onChange={handleSelectMessage}
          />
        </div>
      )}
      <div
        className={`
      
      max-w-md w-fit p-2 duration-700 transition-all rounded-xl ${
        currentUserMessage
          ? "self-end bg-zinc-800 rounded-br-none ml-auto"
          : "    bg-black rounded-bl-none"
      } text-gray-50 shadow-2xl relative
    `}
      >
        <div className="overflow-hidden break-words">
          <img
            className="rounded-xl "
            alt={attachments[0]}
            src={tranformUrl(attachments[0], 500)}
            onClick={() => setPreviewImage(attachments[0])}
          />
        </div>

        <div className="absolute bottom-3 right-3 bg-black rounded-lg p-1 flex text-[10px] justify-end items-center w-fit float-right flex-col text-right text-gray-300">
          <span className="flex items-center gap-3 text-white">
            {getReadableTime(createdAt)}
            {currentUserMessage &&
              (seen || allSeen ? (
                <DoubleCheckIcon className="text-blue-500" />
              ) : (
                <Check />
              ))}
          </span>
        </div>
        <AnimatePresence>
          {previewImage && (
            <Modal onClose={() => setPreviewImage()} animate={false}>
              <div className="w-screen h-dvh p-10">
                <div></div>
                <ImageComponent
                  src={previewImage}
                  alt={"IMAGE PREVIEW"}
                  className="w-full h-full object-contain"
                  loaderClassName="w-screen animate-pulse h-dvh bg-zinc-950"
                />
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const AudioPlayer = memo(({ src, getDurationAndCurrentTime }) => {
  const { containerRef, isPlaying, currentTime, onPlayPause, duration } =
    useWaveProgress(src);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const formatedTime = formatTime(currentTime);
    const formatedDuration = formatTime(duration);
    getDurationAndCurrentTime(formatedDuration, formatedTime);
  }, [duration, currentTime, getDurationAndCurrentTime]);

  return (
    <div className="p-2  w-[340px]">
      <div className="flex gap-4 items-center">
        <button
          onClick={onPlayPause}
          className=" text-white font-bold py-2 px-4 rounded"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <div className=" flex flex-col relative w-52">
          <div ref={containerRef} />
        </div>

        <div className="p-2 bg-yellow-500 rounded-full ">
          <HeadSet size={24} />
        </div>
      </div>
    </div>
  );
});
export { AudioPlayer };
