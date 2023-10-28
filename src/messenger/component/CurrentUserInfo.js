import React from "react";
import noDp from "../../assets/no_avatar.png";

const CurrentUserInfo = ({ user }) => {
  return (
    <div className="w-full flex gap-4 p-2 dark:text-gray-50">
      <div className="w-12 h-12 rounded-full overflow-clip">
        <img src={user?.profilePicture || noDp} alt="" />
      </div>
      <div className="">
        <h4 className="font-semibold">{user?.name}</h4>
        <span className="text-sm">{user.username}</span>
      </div>
    </div>
  );
};

export default CurrentUserInfo;
