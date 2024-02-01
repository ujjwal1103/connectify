import React from "react";
import { useState } from "react";
import VideoPlayer from "../../components/VideoPlayer";
import { ImageSlider } from "../../../common/ImageSlider/ImageSlider";

const PostContent = ({ contentUrl, onClick, type = "video" }) => {
  const [isLoading, setIsLoading] = useState(true);

  // if (type === "video") {
  //   return <VideoPlayer />;
  // }

  return (
    <div className=" w-full rounded-md ">
      <div className="relative w-full min-h-fit max-h-[500px] ">
        <div className="overflow-hidden bg-clip-content">
          <ImageSlider images={contentUrl}  />
        </div>
        {/* {isLoading && (
          <div className="bg-slate-800 top-0 bottom-0 absolute w-full animate-pulse  "></div>
        )} */}
      </div>
    </div>
  );
};

export default PostContent;
