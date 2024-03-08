import { makeRequest } from "../../config/api.config";
import { useCallback, useEffect, useState } from "react";
import avatar from "../../assets/man.png";
import { useNavigate } from "react-router-dom";
import { Search } from "../../icons";
import Input from "../../common/InputFields/Input";
import FollowButton from "../../shared/FollowButton";
import { unfollowUser } from "../services/postServices";
import { useDispatch, useSelector } from "react-redux";
import { profileState, setFollowing } from "../../redux/services/profileSlice";
import FadeInAnimation from "../../utils/Animation/FadeInAnimation";

import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import ProfilePicture from "../../common/ProfilePicture";
import FollowBtn from "../../shared/Buttons/FollowBtn";

const Following = ({ userId }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { followings } = useSelector(profileState);
  const dispatch = useDispatch();
  const [query, setQuery] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getFollowing = async (p) => {
    if (p === 1) {
      setLoading(true);
    }
    let url = `/following/${userId}?page=${p}`;
    if (query) {
      url = url + `&username=${query}`;
    }
    try {
      const data = await makeRequest.get(url);
      if (data.isSuccess) {
        dispatch(setFollowing([...followings, ...data.followings]));
        setLoading(false);
        setHasMore(data?.followings?.length !== 0);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFollowing(page);
  }, [userId, dispatch, query, page]);

  const navigateToUser = (username) => {
    if (username === currentUser?.username) {
      navigate(`/profile`);
    } else {
      navigate(`/${username}`);
    }
  };

  const handleFollowButtonClick = async (userId) => {
    const data = await unfollowUser(userId);
    if (data.isSuccess) {
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setFollowing([]));
    };
  }, []);

  return (
    <FadeInAnimation>
      <div className="flex items-center h-screen justify-center">
        <div className="w-96 bg-white dark:bg-zinc-950 border rounded-lg ">
          <div className=" text-black dark:text-white text-center w-full p-3 ">
            <h2 className="text-xl">Following</h2>
          </div>
          <hr />
          <div>
            <div className="w-full p-2">
              <Input
                type="text"
                onChange={(e) => {
                  setPage(1);
                  setQuery(e.target.value);
                }}
                className="w-full p-3 text-white outline-none border-none ml-5 focus:outline-none focus:ring-0 bg-transparent"
                placeholder="search"
                value={query}
                prefix={<Search className="text-gray-100" />}
              />
            </div>
          </div>
          <div
            className="overflow-y-scroll min-h-96 h-[500px] "
            id="scrollableDiv"
          >
            {!loading && (
              <InfiniteScroll
                dataLength={followings?.length}
                next={() => {
                  setPage((prev) => prev + 1);
                }}
                loader={[1, 2, 3, 4, 5, 6].map((id) => (
                  <Loading key={id} />
                ))}
                hasMore={hasMore}
                scrollableTarget={"scrollableDiv"}
              >
                {followings?.map((user) => {
                  return (
                    <div className="m-3" key={user?._id}>
                      <div className="flex items-center dark:bg-zinc-800 justify-between space-x-2 hover:scale-90 duration-500 bg-slate-50 shadow-lg m-2 p-2 rounded-lg  ">
                        <div className="flex items-center space-x-2">
                          <ProfilePicture
                            src={user?.avatar}
                            className="inline-block h-12 w-12 rounded-full hover:scale-90 duration-500 object-cover"
                          />

                          <button
                            onClick={() => navigateToUser(user?.username)}
                            className="flex flex-col"
                          >
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
                              {user?.name}
                            </span>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              {user?.username}
                            </span>
                          </button>
                        </div>
                        {user?.username === currentUser.username ? (
                          ""
                        ) : (
                          <FollowBtn
                            callBack={(data)=>{
                              console.log(data)
                            }}
                            userId={user?._id}
                            isFollow={user?.isFollow}
                            
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </InfiniteScroll>
            )}

            {loading && [1, 2, 3, 4, 5, 6].map((id) => <Loading key={id} />)}
          </div>
        </div>
      </div>
    </FadeInAnimation>
  );
};

export default Following;
