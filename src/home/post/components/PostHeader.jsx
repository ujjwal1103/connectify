import React, { useState } from "react";
import { ThreeDots } from "../../../icons";
import ProfilePicture from "../../../common/ProfilePicture";
import UsernameLink from "../../../shared/UsernameLink";
import { Menu, MenuItem } from "../../../shared/Components/Menu";
import { Link } from "react-router-dom";

const PostHeader = ({ post }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <div className="w-full py-2 flex gap-6 items-center justify-between">
      <div className="flex gap-3 items-center">
        <div>
          <ProfilePicture
            useSmall={true}
            src={post?.user?.avatar}
            className="rounded-full w-10 h-10 object-cover"
          />
        </div>
        <div className="flex flex-col items-center dark:text-gray-50">
          <UsernameLink username={post?.user?.username} />
          <span>{post?.location}</span>
        </div>
      </div>
      <div className="relative">
        <ThreeDots
          className="dark:text-gray-50 cursor-pointer"
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
            setShowMenu(!showMenu);
          }}
        />

        <Menu
          menuPosition={{ top: 20, right: 5 }}
          anchorEl={anchorEl}
          open={showMenu}
          onClose={() => {
            setShowMenu(false);
          }}
        >
          <MenuItem >
            <Link to={`p/${post._id}`}>Open Post</Link>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default PostHeader;
