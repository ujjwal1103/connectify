import React, { useEffect, useCallback } from "react";
import { makeRequest } from "../../config/api.config";
import Suggetion from "./Suggetion";
import Self from "../self/Self";
import { useDispatch, useSelector } from "react-redux";
import { setSuggetions } from "../../redux/services/suggetionSlice";

const Suggetions = () => {
  const dispatch = useDispatch();
  const { user } = JSON.parse(localStorage.getItem("user"));
  const { suggestedusers } = useSelector((state) => state.suggetions);

  const getSuggetions = useCallback(async () => {
    const res = await makeRequest("users");
    dispatch(setSuggetions(res.data.users));
  }, [dispatch]);

  useEffect(() => {
    getSuggetions();
  }, [getSuggetions]);

  return (
    <div className="hidden lg:block">
      <Self />
      <div className="p-2 mx-2 flex justify-between dark:text-gray-100">
        <span>Suggested for you</span>
        <span>see all</span>
      </div>
      {suggestedusers?.map((u) => (
        <Suggetion key={u?._id} user={u} username={user?.username} userId={user?._id}/>
      ))}
    </div>
  );
};

export default Suggetions;
