import React, { useRef } from "react";
import avatar from "../assets/man.png";

const ProfilePicture = ({ url, className }) => {
  const imageRef = useRef();
  return (
    <img
      ref={imageRef}
      src={url || avatar}
      onError={() => {
        imageRef.current.src = avatar;
      }}
      alt={url || "profile image"}
      className={className}
    />
  );
};

export default ProfilePicture;
