import React from "react";

const PostContent = ({ contentUrl, onClick }) => {
  return (
    <div className=" w-full rounded-md p-2 " onClick={onClick}>
      <img
        src={contentUrl}
        alt=""
        srcset=""
        className="w-full object-contain  rounded-2xl bg-black min-h-[190px] max-h-[500px]"
      />
    </div>
  );
};

export default PostContent;
