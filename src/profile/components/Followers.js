import { useCallback, useEffect, useState } from "react";
import { makeRequest } from "../../config/api.config";
import { useNavigate } from "react-router-dom";
import Input from "../../common/InputFields/Input";
import { profileState, setFollower } from "../../redux/services/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../utils/getCurrentUserId";
import { Search } from "../../icons";
import FadeInAnimation from "../../utils/Animation/FadeInAnimation";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import ProfilePicture from "../../common/ProfilePicture";
import FollowBtn from "../../shared/Buttons/FollowBtn";
import { useDebounce } from "../../utils/hooks/useDebounce";
const Followers = ({ userId }) => {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();
  const { followers = [] } = useSelector(profileState);
  const [query, setQuery] = useState();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const debouncedQuery = useDebounce(query, 300);
  const dispatch = useDispatch();

  const getFollowers = useCallback(async () => {
    if (page === 1) {
      setLoading(true);
    }
    let url = `/followers/${userId}?page=${page}`;
    if (debouncedQuery && debouncedQuery.length > 3) {
      url = url + `&username=${debouncedQuery}`;
    }
    try {
      const data = await makeRequest.get(url);
      if (data.isSuccess) {
        setHasMore(data.hasMore);
        if (page === 1) {
          dispatch(setFollower(data.followers));
        } else {
          dispatch(setFollower([...followers, ...data.followers]));
        }
        setLoading(false);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }

  }, [userId, page, debouncedQuery, dispatch]);

  useEffect(() => {
    getFollowers();
  }, [getFollowers]);

  const navigateToUser = (username) => {
    if (username === currentUser?.username) {
      navigate(`/profile`);
    } else {
      navigate(`/profile/${username}`);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setFollower([]));
    };
  }, [dispatch]);
  return (
    <FadeInAnimation>
      <div className="flex md:min-h-64 md:h-follow h-dvh items-center w-screen justify-center">
        <div className="md:w-96 w-screen bg-white dark:bg-zinc-950 md:border rounded-lg ">
          <div className=" text-black dark:text-white text-center w-full p-3 ">
            <h2 className="text-xl">Followers</h2>
          </div>
          <hr />
          <div>
            <div className="w-full p-2">
              <Input
                type="text"
                onChange={(e) => {
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
            className="overflow-y-scroll md:h-96 h-follower"
            id="scrollableDiv"
          >
            {!loading && (
              <InfiniteScroll
                dataLength={followers?.length}
                next={() => {
                  setPage((prev) => prev + 1);
                }}
                loader={[1].map((id) => (
                  <Loading key={id} />
                ))}
                hasMore={hasMore}
                scrollableTarget={"scrollableDiv"}
              >
                {followers?.map((user) => {
                  return (
                    <div className="md:m-3" key={user?._id}>
                      <div className="flex items-center dark:bg-zinc-800 justify-between space-x-2 hover:scale-90 duration-500 bg-slate-50 shadow-lg m-2 p-2 rounded-lg  ">
                        <div className="flex items-center space-x-2">
                          <ProfilePicture
                            src={user?.avatar}
                            className="inline-block md:size-12 size-8  rounded-full hover:scale-90 duration-500 object-cover"
                          />

                          <button
                            onClick={() => navigateToUser(user?.username)}
                            className="flex flex-col md:text-sm text-xs"
                          >
                            <span className=" font-medium text-gray-900 dark:text-gray-50">
                              {user?.name}
                            </span>
                            <span className="  text-gray-500 dark:text-gray-400">
                              {user?.username}
                            </span>
                          </button>
                        </div>

                        <FollowBtn
                          callBack={() => {}}
                          isPrivate={user?.isPrivate}
                          userId={user?._id}
                          isFollow={user?.isFollow}
                          showRemoveFollowerBtn={userId === currentUser._id}
                        />
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

export default Followers;
