import React, { useEffect, useState } from "react";


const FollowButton = ({ className, isFollow, onClick , btnText}) => {
  const [btnTitle, setBtnTitle] = useState(btnText);

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
