import React, { useState, useEffect, useCallback } from "react";
import { makeRequest } from "../../config/api.config";
import ProfilePicture from "../../common/ProfilePicture";
import UsernameLink from "../../shared/UsernameLink";
import NewChatBtn from "./NewChatBtn";
import { ChevronBack, Edit } from "../../icons";
import { useNavigate } from "react-router-dom";

const CurrentUserInfo = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const getUser = useCallback(async () => {
    try {
      const response = await makeRequest("/user");
      setUser(response.user);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className="w-full box-border  flex gap-4 p-1 lg:p-2 border-b dark:border-zinc-700 justify-between items-center dark:text-gray-50">
      <div className="flex gap-4 p-2 items-center  dark:text-gray-50">
        <button
          onClick={() => {
            navigate('/',{replace:true});
          }}
        >
          <ChevronBack size={24} />
        </button>
        <ProfilePicture
          src={user?.avatar}
          className="inline-block lg:size-12 size-7 rounded-full hover:scale-90 duration-500 object-cover"
        />
        <div className="text-base">
          <h4 className="font-semibold text-xs lg:text-base">{user?.name}</h4>
          <UsernameLink username={user?.username} className="text-xs lg:text-base"/>
        </div>
      </div>
      <NewChatBtn title={<Edit />} />
    </div>
  );
};

export default CurrentUserInfo;
