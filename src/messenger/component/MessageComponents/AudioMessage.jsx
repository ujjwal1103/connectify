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