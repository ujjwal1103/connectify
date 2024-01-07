import React from "react";
import { ThreeDots } from "../../../icons";
import ProfilePicture from "../../../common/ProfilePicture";
import UsernameLink from "../../../shared/UsernameLink";
const PostHeader = ({ post }) => {
  return (
    <div className="w-full p-3 flex gap-6 items-center justify-between">
      <div className="flex gap-6 items-center">
        <div>
          <ProfilePicture
            url={post?.user?.profilePicture}
            className="rounded-full w-10 h-10 object-cover"
          />
        </div>
        <div className="flex flex-col items-center dark:text-gray-50">
          <UsernameLink username={post?.user?.username} />

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
