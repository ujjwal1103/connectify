import React, { useRef } from "react";
import avatar from "../assets/man.png";
import { BiLoader } from "react-icons/bi";
import { tranformUrl } from "../utils";

const ProfilePicture = ({
  src,
  className,
  loading = false,
  alt = "images",
  onClick = () => {},
  useSmall = true,
}) => {
  const imageRef = useRef();

  if (loading) {
    return (
      <div className="relative flex justify-center items-center">
        <img
          ref={imageRef}
          src={(useSmall ? tranformUrl(src): src) || avatar}
          onError={() => {
            imageRef.current.src = avatar;
          }}
          alt={alt || "profile image"}
          className={className}
        />
        <span className="absolute inset-0 flex justify-center items-center bg-black rounded-full bg-opacity-20">
          <BiLoader className="animate-spin fill-zinc-900 text-4xl" />
        </span>
      </div>
    );
  }

  return (
    <img
      ref={imageRef}
      src={(useSmall ? tranformUrl(src): src) || avatar}
      onError={() => {
        imageRef.current.src = avatar;
      }}
      onClick={onClick}
      alt={alt || "profile image"}
      className={className}
    />
  );
};

export default ProfilePicture;
