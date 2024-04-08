import Message from "./Message";
import { getCurrentUserId } from "../../utils/getCurrentUserId";
import { BiLoader } from "react-icons/bi";
import { forwardRef, useEffect, useRef } from "react";

const Messages = ({ isLoading, allMessages = {}, page }, ref) => {
  const autoscrollRef = useRef(null);

  useEffect(() => {
    if (autoscrollRef.current && page === 1) {
      autoscrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    } 
  }, [allMessages]);

  if (isLoading) {
    return (
      <div className="h-full flex flex-1 justify-center items-center dark:text-gray-50 text-xl  mb-4 p-2 ">
        <BiLoader size={44} className="animate-spin" />
      </div>
    );
  }

  if (!Object.keys(allMessages) || (Object.keys(allMessages)?.length === 0 && !isLoading))
    return (
      <div className="h-full flex flex-1 justify-center items-center dark:text-gray-50 text-xl  mb-4 p-2 ">
        Send new message to start a conversation
      </div>
    );

  return (
    <div ref={ref} className="h-full flex flex-col scroll-smooth flex-1 gap-3  overflow-y-scroll overflow-x-hidden  p-2 ">
      <div>
        {Object.keys(allMessages).map((date) => (
          <div className="flex flex-col gap-3" key={Date.now()}>
            <h3 className="text-center text-[10px]  text-gray-200 w-fit self-center p-1 rounded-xl bg-neutral-950">
              {date}
            </h3>
            {allMessages[date].map((message) => (
              <Message
                key={message._id}
                currentUserMessage={message.from === getCurrentUserId()}
                message={message}
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
