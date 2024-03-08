import React from "react";
import { ImageSlider } from "../../../common/ImageSlider/ImageSlider";

const PostContent = ({ contentUrl, type = "video" }) => {
  return (
    <div className=" w-full rounded-md overflow-clip ">
      <div className="relative w-full min-h-fit max-h-[500px] ">
        <div className="overflow-hidden bg-clip-content">
          <ImageSlider images={contentUrl} />
        </div>
      </div>
    </div>
  );
};

export default PostContent;
