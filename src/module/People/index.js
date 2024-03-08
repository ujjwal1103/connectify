import React, { useEffect, useState } from "react";
import ProfilePicture from "../../common/ProfilePicture";
import FollowBtn from "../../shared/Buttons/FollowBtn";
import UsernameLink from "../../shared/UsernameLink";
import Button from "../../shared/Components/Button";
import InfiniteScroll from "react-infinite-scroll-component";
import { makeRequest } from "../../config/api.config";
import Loading from "../../profile/components/Loading";

const Peoples = () => {
  const [peoples, setPeoples] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const fetchPeoples = async (p) => {
    if (page === 1) {
      setLoading(true);
    }
    const res = await makeRequest.get(`/users?page=${p}`);
    setPeoples([...peoples, ...res?.users]);
    setHasMore(res?.pagination?.hasMore);
    setLoading(false);
  };

  useEffect(() => {
    fetchPeoples(page);
  }, [page]);

  if (loading) {
    return (
      <div className="h-post bg-[#0D0D0D]">
        <div className=" w-[50%]  m-auto flex  flex-col items-center">
          <div className="flex justify-start  w-full p-2">
            <span className="h-6 bg-zinc-800 rounded-md w-44 "></span>
          </div>
          {[12, 23, 34, 4, 5, 6,3].map((i) => (
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
    <div className="h-page overflow-y-scroll bg-[#0D0D0D]" id="scrollableDiv">
      <div className="w-[50%]  m-auto  ">
        <h1 className="py-3  text-xl">Suggested</h1>
        <InfiniteScroll
          dataLength={peoples?.length}
          next={() => {
            setPage((prev) => prev + 1);
          }}
          hasMore={hasMore}
          loader={[12, 23, 34].map((i) => (
            <li className="flex py-2  gap-3 w-full items-center px-2">
              <ProfilePicture className={"w-14 h-14 rounded-full"} />
              <div className="flex flex-col gap-2">
                <span className="h-4 rounded-md w-24 bg-zinc-800"></span>
                <span className="h-4 rounded-md w-16 bg-zinc-800"></span>
              </div>
              <div className="ml-auto mr-10 self-center">
                <button className="h-6 rounded w-14 bg-zinc-800"></button>
              </div>
            </li>
          ))}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollableTarget={"scrollableDiv"}
        >
          {peoples?.map((people) => {
            return <People people={people} />;
          })}
        </InfiniteScroll>
        {/* <ul className="w-full bg-[#1A1A1A] ">
          {suggestedusers?.map((people) => {
            return <People people={people} />;
          })}
          <div
            style={{
              display: "flex",
              padding: "12px",
              justifyContent: "center",
            }}
          >
            <Button onClick={() => {}} size={"medium"} className={"text-sm"}>
              Load more
            </Button>
          </div>
        </ul> */}
      </div>
    </div>
  );
};

export default Peoples;

const People = ({ people }) => {
  const { avatar, username, name } = people;
  return (
    <li className="flex py-2  gap-3 w-full items-center px-2">
      <ProfilePicture src={avatar} className={"w-14 h-14 rounded-full"} />
      <div className="flex flex-col">
        <span>{name}</span>
        <UsernameLink username={username} className="text-gray-400" />
      </div>
      <div className="ml-auto mr-10 self-center">
        <FollowBtn size="medium" isFollow={false} />
      </div>
    </li>
  );
};
