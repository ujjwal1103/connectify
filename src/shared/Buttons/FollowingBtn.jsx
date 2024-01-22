import React from "react";

const FollowingBtn = ({ onClick, text }) => {
  return (
    <button
      className="text-xs bg-gradient-to-l from-violet-900 to-blue-900 px-2 rounded-xl text-sky-100 py-1"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default FollowingBtn;
