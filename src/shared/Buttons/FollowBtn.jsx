import React from "react";

const FollowBtn = ({ onClick }) => {

  

  return (
    <button
      className="text-xs  bg-gradient-to-l from-sky-900 to-indigo-900 px-2 rounded-xl text-sky-100 py-1"
      onClick={onClick}
    >
      Follow
    </button>
  );
};

export default FollowBtn;



