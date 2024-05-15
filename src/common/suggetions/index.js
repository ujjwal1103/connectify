import React, { useCallback, useEffect, useState } from "react";
import ProfilePicture from "../../common/ProfilePicture";
import FollowBtn from "../../shared/Buttons/FollowBtn";
import UsernameLink from "../../shared/UsernameLink";
import { getUsersSuggetions } from "../../api";
import { useGetQuery } from "../../utils/hooks/useGetQuery";

const SuggetionContainer = () => {
  const { data, isLoading } = useGetQuery({
    fn: getUsersSuggetions(1, 10),
  });

  if (isLoading) {
    return (
      <div className="h-post bg-[#0D0D0D]">
        <div className=" w-[50%]  m-auto flex  flex-col items-center">
          <div className="flex justify-start  w-full p-2">
            <span className="h-6 bg-zinc-800 rounded-md w-44 "></span>
          </div>
          {[12, 23, 34, 4, 5, 6, 3].map((i) => (
            <li className="flex py-2  gap-3 w-full items-center px-2">
              <div className={"w-14 h-14 rounded-full bg-zinc-800"} />
              <div className="flex flex-col gap-2">
                <span className="h-4 rounded-md w-24 bg-zinc-800"></span>
                <span className="h-4 rounded-md w-16 bg-zinc-800"></span>
              </div>
              <div className="ml-auto mr-10 self-center">
                <button className="h-6 rounded w-14 bg-zinc-800"></button>
              </div>
            </li>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-scroll overflow-hidden suggetionBox ">
      <div className="inline-flex h-44 max-h-44">
        {data?.users?.map((people) => {
          return <People key={people._id} {...people} />;
        })}
      </div>
    </div>
  );
};

export default SuggetionContainer;

const People = ({ avatar, username, name, _id }) => (
  <div className=" w-36 p-2 rounded-lg border dark:border-zinc-500/30  flex items-center justify-between flex-col mx-2 mb-2">
    <ProfilePicture src={avatar} className={"w-14 h-14 rounded-full"} />
    <div className="flex flex-col justify-center">
      <span className="text-[14px]">{name}</span>
      <UsernameLink username={username} className="text-gray-400 text-[12px]" />
    </div>
    <div className="flex justify-center">
      <FollowBtn size="medium" isFollow={false} userId={_id}/>
    </div>
  </div>
);
