import React, { useRef } from "react";
import avatar from "../assets/man.png";

const ProfilePicture = ({ src, className }) => {
  const imageRef = useRef();
  return (
    <img
      ref={imageRef}
      src={src || avatar}
      onError={() => {
        imageRef.current.src = avatar;
      }}
      alt={src || "profile image"}
      className={className}
    />
  );
};

export default ProfilePicture;
