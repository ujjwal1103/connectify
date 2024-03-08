import React, { useEffect, useState } from "react";

const FollowButton = ({ className, isFollow, onClick, btnText, canRemove }) => {
  const [btnTitle, setBtnTitle] = useState(btnText);
  useEffect(() => {
    if (canRemove) {
      setBtnTitle("Remove");
    } else if (isFollow && !canRemove) {
      setBtnTitle("Following");
    } else {
      setBtnTitle("follow");
    }
  }, []);
  return (
    <button className={className} onClick={onClick}>
      {btnTitle}
    </button>
  );
};

export default FollowButton;
