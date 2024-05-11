import React, { useState } from "react";
import Following from "./Following";
import Followers from "./Followers";
import ProfilePicture from "../../common/ProfilePicture";
import Modal from "../../shared/Modal";
import { getCurrentUsername, getCurrentName } from "../../utils/getCurrentUserId";

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
      <div className="bg-zinc-900 relative rounded-md p-2 w-full">
        <div className="flex md:px-10 md:pt-10 lg:p-0 items-center lg:justify-center justify-center md:justify-start md:gap-10">
          <div className="flex justify-center items-center  flex-col gap-4 py-2 md:bg-red- ">
            <span className="text-xl md:hidden lg:block">{user?.username}</span>
            <div className=" bg-gray-500 rounded-full">
              <ProfilePicture
                useSmall={false}
                src={user?.avatar}
                className="size-28 md:size-20 object-cover rounded-full shadow-sm"
              />
            </div>
            <span className="text-xl">{user.name}</span>
          </div>
         <div className="lg:hidden"> <span className="text-xl hidden md:block lg:hidden">{user?.username}</span>
          <CountGrid
          className="md:grid grid-cols-3 gap-2 my-2 hidden lg:hidden"
          posts={user?.posts}
          followers={user?.followers}
          following={user?.following}
          toggleShow={toggleShow}
          toggleShowFollowing={toggleShowFollowing}
        /></div>
        </div>

        <div className="pb-2 md:px-10 lg:p-0">
          <div className="">
            <pre>{user?.bio}</pre>
          </div>
        </div>
        {children}
        <CountGrid
          className="grid grid-cols-3 gap-2 my-2 md:hidden lg:grid"
          posts={user?.posts}
          followers={user?.followers}
          following={user?.following}
          toggleShow={toggleShow}
          toggleShowFollowing={toggleShowFollowing}
        />
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

const CountGrid = ({
  posts,
  following,
  followers,
  toggleShow,
  toggleShowFollowing,
  className,
}) => {
  return (
    <div className={className}>
      <button className="flex flex-col rounded-lg justify-center items-center bg-zinc-800">
        <span className="">Posts</span>
        <span className="">{posts}</span>
      </button>
      <button
        onClick={toggleShow}
        className="flex flex-col rounded-lg justify-center items-center  bg-zinc-800"
      >
        <span className="">Followers</span>
        <span className="">{followers}</span>
      </button>
      <button
        onClick={toggleShowFollowing}
        className="flex flex-col px-2 rounded-lg justify-center items-center  bg-zinc-800"
      >
        <span className="">Following</span>
        <span className="">{following}</span>
      </button>
    </div>
  );
};
