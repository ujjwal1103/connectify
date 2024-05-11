import Message from "./Message";
import { getCurrentUserId } from "../../utils/getCurrentUserId";
import { BiLoader } from "react-icons/bi";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { SEEN_MESSAGES } from "../../utils/constant";
import useSocketEvents from "../../hooks/useSocketEvents";
import { useSocket } from "../../context/SocketContext";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const Messages = ({ isLoading, allMessages = {}, page, messages }, ref) => {
  const { chatId } = useParams();
  const autoscrollRef = useRef(null);
  const [seenMessagesIds, setSeenMessagesIds] = useState([]);
  const { socket } = useSocket();
  const { selectedMessages } = useSelector((state) => state.chat);

  const handleSeen = useCallback(
    (data) => {
      if (data.chat === chatId) {
        if (data.message) {
          setSeenMessagesIds((prev) => [...prev, data.message]);
        } else {
          setSeenMessagesIds(data.idsOnly || []);
        }
      }
    },
    [chatId]
  );

  const eventHandlers = {
    [SEEN_MESSAGES]: handleSeen,
  };

  useSocketEvents(socket, eventHandlers);

  useEffect(() => {
    if (autoscrollRef.current && page === 1) {
      autoscrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages, page]);

  if (isLoading && page === 1) {
    return (
      <div className="h-full flex flex-1 justify-center items-center dark:text-gray-50 text-xl  mb-4 p-2 ">
        <BiLoader size={44} className="animate-spin" />
      </div>
    );
  }

  if (
    !Object.keys(allMessages) ||
    (Object.keys(allMessages)?.length === 0 && !isLoading)
  )
    return (
      <div className="h-full flex flex-1 justify-center items-center dark:text-gray-50 text-xl  mb-4 p-2 ">
        Send new message to start a conversation
      </div>
    );

  return (
    <div
      ref={ref}
      className="h-full flex flex-col scroll-smooth flex-1 gap-3  overflow-y-scroll overflow-x-hidden  p-2 "
    >
      <div>
        {Object.keys(allMessages).map((date, index) => (
          <div className="flex flex-col" key={Date.now() + index}>
            <h3 className="text-center text-[10px] my-2 text-gray-200 w-fit self-center py-1 px-2 mt-2 rounded-xl bg-neutral-950">
              {date}
            </h3>
            {allMessages[date].map((message, index) => (
              <Message
                seen={seenMessagesIds?.some((id) => id === message._id)}
                key={message._id}
                currentUserMessage={message.from === getCurrentUserId()}
                message={message}
                isMessageSelected={selectedMessages?.some(
                  (m) => m === message._id
                )}
                isLastMessagae={allMessages[date][index + 1] ? false : true}
                isNextMessageUsMine={
                  allMessages[date][index + 1]?.from === message.from
                }
              />
            ))}
          </div>
        ))}

        <div id="scrollar" ref={autoscrollRef} />
      </div>
    </div>
  );
};

export default forwardRef(Messages);
