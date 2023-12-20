import React, { useEffect, useState } from "react";


const FollowButton = ({ className, isFollow, onClick }) => {
  const [btnTitle, setBtnTitle] = useState("follow");

  useEffect(() => {
    if (isFollow) {
      setBtnTitle("Unfollow");
    }
  }, []);
  return (
    <button className={className} onClick={onClick}>
      {btnTitle}
    </button>
  );
};

export default FollowButton;
