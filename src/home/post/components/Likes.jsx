import React, { useEffect, useState } from "react";
import { makeRequest } from "../../../config/api.config";
import ProfilePicture from "../../../common/ProfilePicture";
import UsernameLink from "../../../shared/UsernameLink";

const Likes = ({ like, postId }) => {
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        if (like > 0) {
          const res = await makeRequest(`/likes/${postId}`);
          setLikes(res.likes);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchLikes();
  }, []);

  return (
    <div className="w-full lg:w-96 lg:h-96  h-screen dark:bg-slate-900  rounded-lg overflow-hidden">
      <div className="bg-slate-950 py-3 text-center  dark:text-white sticky top-0">
        Likes
      </div>
      <ul className="p-2 overflow-y-scroll lg:h-96 h-screen pb-[60px]   ">
        {likes?.map((l) => {
          return (
            <>
              <li key={l._id} className="flex items-center gap-3 p-2 mb-2  bg-slate-950 rounded-lg">
                <ProfilePicture
                  url={l?.profilePicture}
                  className="rounded-full w-10 h-10 object-cover"
                />
                <div className="flex flex-col ">
                  <UsernameLink
                    username={l?.username}
                    className="dark:text-white text-xs"
                  />
                  <span className="dark:text-gray-50 text-xs">{l?.name}</span>
                </div>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Likes;
