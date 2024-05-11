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
import BubbleNotch from "../../icons/BubbleNotch";
import ProfilePicture from "../../common/ProfilePicture";
import UsernameLink from "../../shared/UsernameLink";
import { Link } from "react-router-dom";
const Message = ({
  currentUserMessage,
  seen: allSeen,
  isMessageSelected,
  message,
  isNextMessageUsMine,
  isLastMessagae,
}) => {
  const {
    text,
    createdAt,
    seen,
    messageType,
    attachments,
    _id,
    username,
    avatar,
    caption,
    postId,
    postImages,
    isUnavailable,
  } = message;
  const { isSelectMessages } = useSelector((state) => state.chat);
  const [showNotch, setShowNotch] = useState(false);
  const dispatch = useDispatch();

  const handleSelectMessage = (e) => {
    dispatch(setSelectedMessage(_id));
  };

  const className = clsx(
    "w-full transition-colors duration-500 flex mb-1",
    isSelectMessages && "hover:bg-zinc-950 hover:bg-opacity-30",
    isMessageSelected && "bg-zinc-950 bg-opacity-30"
  );

  useEffect(() => {
    if (!isNextMessageUsMine || isLastMessagae) {
      setShowNotch(true);
    }

    // }else if (!(isNextMessageUsMine && isPreviousMessageUsMine)) {
    //   setShowNotch(true);
    // }
  }, []);

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
        showNotch={showNotch}
      />
    );
  }
  if (messageType === "POST_MESSAGE") {
    return (
      <PostMessage
        postImages={postImages}
        className={className}
        isSelectMessages={isSelectMessages}
        isMessageSelected={isMessageSelected}
        handleSelectMessage={handleSelectMessage}
        currentUserMessage={currentUserMessage}
        createdAt={createdAt}
        username={username}
        avatar={avatar}
        caption={caption}
        seen={seen}
        allSeen={allSeen}
        postId={postId}
        isUnavailable={isUnavailable}
        showNotch={showNotch}
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
        showNotch={showNotch}
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
        showNotch={showNotch}
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
      showNotch={showNotch}
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
    showNotch
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
      max-w-md w-fit p-2 mx-3 z-10 duration-700 transition-all rounded-xl ${
        currentUserMessage ? "self-end bg-zinc-800  ml-auto" : "    bg-black "
      } text-gray-50 shadow-2xl relative
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

          {showNotch && <Notch currentUserMessage={currentUserMessage} />}
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
  showNotch
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
      
      max-w-md w-fit p-2 z-10 mx-3 duration-700 transition-all rounded-xl ${
        currentUserMessage ? "self-end bg-zinc-800  ml-auto" : "    bg-black "
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
        {showNotch && <Notch currentUserMessage={currentUserMessage} />}
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
  showNotch,
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
    max-w-md w-fit p-2 z-10 mx-4 duration-700 transition-all rounded-xl ${
      currentUserMessage ? "self-end bg-zinc-800  ml-auto" : "    bg-black "
    } text-gray-50 shadow-2xl relative
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
          <span className="flex z-[1] items-center gap-3 self-end">
            {getReadableTime(createdAt)}{" "}
            {currentUserMessage &&
              (seen || allSeen ? (
                <DoubleCheckIcon className="text-blue-500" />
              ) : (
                <Check />
              ))}
          </span>
        </div>

        {showNotch && <Notch currentUserMessage={currentUserMessage} />}
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
  showNotch
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
      
      max-w-md w-fit p-2 z-10 mx-3 duration-700 transition-all rounded-xl ${
        currentUserMessage ? "self-end bg-zinc-800  ml-auto" : "    bg-black "
      } text-gray-50 shadow-2xl relative
    `}
      >
        <div className="overflow-hidden z-[1] ">
          <img
            className="rounded-xl "
            alt={attachments[0]}
            src={tranformUrl(attachments[0], 500)}
            onClick={() => setPreviewImage(attachments[0])}
          />
        </div>

        <div className="absolute bottom-3 right-3 bg-black rounded-lg p-1 flex text-[10px] justify-end items-center w-fit float-right flex-col text-right text-gray-300">
          <span className="flex z-[1] items-center gap-3 text-white">
            {getReadableTime(createdAt)}
            {currentUserMessage &&
              (seen || allSeen ? (
                <DoubleCheckIcon className="text-blue-500" />
              ) : (
                <Check />
              ))}
          </span>
        </div>

        {showNotch && <Notch currentUserMessage={currentUserMessage} />}
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
const PostMessage = ({
  isSelectMessages,
  isMessageSelected,
  handleSelectMessage,
  currentUserMessage,
  createdAt,
  seen,
  allSeen,
  postImages,
  className,
  username,
  avatar,
  caption,
  postId,
  isUnavailable,
  showNotch
}) => {
  const [previewImage, setPreviewImage] = useState();

  if (isUnavailable) {
    return (
      <div className={className}>
        <div>Post unavailable</div>
      </div>
    );
  }
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
      
      max-w-md w-fit p-2 mx-3 z-10 duration-700 transition-all rounded-xl ${
        currentUserMessage ? "self-end bg-zinc-800  ml-auto" : "    bg-black "
      } text-gray-50 shadow-2xl relative
    `}
      >
        <div className="py-2 flex gap-3 items-center">
          <ProfilePicture src={avatar} className={"size-10 rounded-full"} />
          <UsernameLink username={username} />
        </div>
        <div className="">
          <Link to={`/p/${postId}`}>
            <img
              className="rounded-xl w-52"
              alt={postImages[0]}
              src={tranformUrl(postImages[0], 300)}
            />
          </Link>
        </div>
        {caption && (
          <div className="py-2">
            <span>{caption}</span>
          </div>
        )}

        <div className="p-1  flex text-[10px] justify-end items-center w-fit float-right flex-col text-right text-gray-300">
          <span className="flex z-[1] items-center gap-3 text-white">
            {getReadableTime(createdAt)}
            {currentUserMessage &&
              (seen || allSeen ? (
                <DoubleCheckIcon className="text-blue-500" />
              ) : (
                <Check />
              ))}
          </span>
        </div>
      {showNotch &&  <Notch currentUserMessage={currentUserMessage} />}
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

function Notch({ currentUserMessage }) {
  return (
    <div
      className={`absolute bottom-0 z-[-1] ${
        currentUserMessage ? "-right-2" : "-left-2"
      }`}
    >
      <BubbleNotch
        className={`${currentUserMessage ? "fill-zinc-800 " : "fill-black"}`}
        style={{
          transform: !currentUserMessage ? "rotateY(180deg)" : "rotate(360deg)",
        }}
      />
    </div>
  );
}


