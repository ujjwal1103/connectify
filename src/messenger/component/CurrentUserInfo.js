import React, { useState, useEffect, useCallback } from "react";
import noDp from "../../assets/no_avatar.png";
import { makeRequest } from "../../config/api.config";
import { useDispatch } from "react-redux";
import { addChat } from "../../redux/services/chatSlice";
import ProfilePicture from "../../common/ProfilePicture";
import UsernameLink from "../../shared/UsernameLink";
import NewChatBtn from "./NewChatBtn";
import { Edit } from "../../icons";
const CurrentUserInfo = () => {
  

  const [user, setUser] = useState();
  const dispatch = useDispatch();

  const getUser = useCallback(async () => {
    try {
      const response = await makeRequest("/user");
      setUser(response.user);
      dispatch(setUser(response.user));
    } catch (error) {
      console.log("error", error);
    }
  }, [dispatch]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className="w-full flex gap-4 p-2 justify-between items-center dark:text-gray-50">
      <div className="flex gap-4 p-2 dark:text-gray-50">
        <ProfilePicture
          src={user?.avatar}
          className="inline-block h-12 w-12 rounded-full hover:scale-90 duration-500 object-cover"
        />
        <div className="">
          <h4 className="font-semibold">{user?.name}</h4>
          <UsernameLink username={user?.username} />
        </div>
      </div>
      <NewChatBtn title={<Edit />} />

     
    </div>
  );
};

export default CurrentUserInfo;
