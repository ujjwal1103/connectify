import React from "react";
import avatar from "../../../assets/man.png";
import { ThreeDots } from "../../../icons";
const PostHeader = ({ post }) => {
  return (
    <div className="w-full p-3 flex gap-6 items-center justify-between">
      <div className="flex gap-6 items-center">
        <div>
          <img
            src={post?.userId?.profilePicture || avatar}
            alt="url"
            className="rounded-full w-10 h-10"
          />
        </div>
        <div className="flex flex-col items-center dark:text-gray-50">
          <span>{post?.userId?.username}</span>
          <span>{post?.location}</span>
        </div>
      </div>
      <div className="">
        <ThreeDots className="dark:text-gray-50" />
      </div>
    </div>
  );
};

export default PostHeader;
