import React, { useEffect, useState } from "react";
import { makeRequest } from "../../../config/api.config";
import ProfilePicture from "../../../common/ProfilePicture";
import UsernameLink from "../../../shared/UsernameLink";
import FollowBtn from "../../../shared/Buttons/FollowBtn";

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
  }, [like, postId]);

  return (
    <div className="w-screen lg:w-96 lg:h-96 max-h-screen dark:bg-slate-900  rounded-lg overflow-hidden">
      <div className="bg-slate-950 py-3 text-center dark:text-white  w-full">
        Likes
      </div>
      <ul className="p-2 overflow-y-scroll lg:h-96 h-like ">
        {likes?.map((l) => {
          return (
            <>
              <li
                key={l._id}
                className="flex items-center justify-between p-2 mb-2 last:m-0 bg-slate-950 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {" "}
                  <ProfilePicture
                    src={l?.avatar}
                    className="rounded-full w-10 h-10 object-cover"
                  />
                  <div className="flex flex-col ">
                    <UsernameLink
                      username={l?.username}
                      className="dark:text-white text-xs"
                    />
                    <span className="dark:text-gray-50 text-xs">{l?.name}</span>
                  </div>
                </div>
                <FollowBtn
                  isFollow={l.isFollow}
                  userId={l._id}
                  callBack={(d) => console.log(d)}
                  
                />
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Likes;
