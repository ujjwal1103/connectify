import React, { useState } from "react";
import Following from "./Following";
import Followers from "./Followers";
import ProfilePicture from "../../common/ProfilePicture";
import Modal from "../../shared/Modal";

const ProfileCard = ({ user, children, canOpen }) => {
  const [show, setShow] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const toggleShow = () => {
    if (user?.followers > 0 && !canOpen) {
      setShow((prev) => !prev);
    }
  };
  const toggleShowFollowing = () => {
    if (user?.following > 0 && !canOpen) {
      setShowFollowing((prev) => !prev);
    }
  };

  return (
    <>
      <div className="p-2 h-full w-full bg-zinc-900 dark:border-zinc-500/30 shadow-2xl relative rounded-xl">
        <div className="flex justify-center items-center my-3">
          <span className=" px-5  text-xl">{user?.username}</span>
        </div>
        <div className="flex justify-center items-center">
          <div className=" bg-gray-500 rounded-full">
            <ProfilePicture
              src={user?.avatar}
              className="h-32 w-32 object-cover rounded-full shadow-sm"
            />
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <span className="text-xl px-10 py-2">{user.name}</span>
        </div>
        <div className="text-center pb-2">
          <div className="">
            <pre>{user?.bio}</pre>
          </div>
        </div>
        {children}
        <div className="grid grid-cols-3  gap-3  my-2">
          <button className="flex flex-col rounded-lg justify-center items-center bg-zinc-800">
            <span className="">Posts</span>
            <span className="text-xl">{user?.posts}</span>
          </button>
          <button
            onClick={toggleShow}
            className="flex flex-col rounded-lg justify-center items-center  bg-zinc-800"
          >
            <span className="">Followers</span>
            <span className="text-xl">{user?.followers}</span>
          </button>
          <button
            onClick={toggleShowFollowing}
            className="flex flex-col    rounded-lg justify-center items-center  bg-zinc-800"
          >
            <span className="">Following</span>
            <span className="text-xl">{user?.following}</span>
          </button>
        </div>
      </div>

      {show && (
        <Modal onClose={() => setShow(false)}>
          <Followers userId={user._id} />
        </Modal>
      )}
      {showFollowing && (
        <Modal onClose={() => setShowFollowing(false)}>
          <Following userId={user._id} />
        </Modal>
      )}
    </>
  );
};


export default ProfileCard;
