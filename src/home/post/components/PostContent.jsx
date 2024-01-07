import React from "react";
import { useState } from "react";
import VideoPlayer from "../../components/VideoPlayer";

const PostContent = ({ contentUrl, onClick, type = "video" }) => {
  const [isLoading, setIsLoading] = useState(true);

  // if (type === "video") {
  //   return <VideoPlayer />;
  // }

  return (
    <div className=" w-full rounded-md p-2 " onClick={onClick}>
      <div className="relative w-full min-h-fit max-h-[500px]">
        <img
          src={contentUrl}
          onLoad={() => setIsLoading(false)}
          alt=""
          loading="lazy"
          height={500}
          className=" object-contain w-full max-h-[500px] rounded-2xl bg-black "
        />
        {isLoading && (
          <div className="bg-slate-800 top-0 bottom-0 absolute w-full animate-pulse  "></div>
        )}
      </div>
    </div>
  );
};

export default PostContent;
