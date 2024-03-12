import { useEffect, useState } from "react";
import { makeRequest } from "../../config/api.config";
import avatar from "../../assets/man.png";
import { useNavigate } from "react-router-dom";
import Input from "../../common/InputFields/Input";
import { profileState, setFollower } from "../../redux/services/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import FollowButton from "../../shared/FollowButton";
import { getCurrentUser } from "../../utils/getCurrentUserId";
import { Search } from "../../icons";
import FadeInAnimation from "../../utils/Animation/FadeInAnimation";
import Loading from "./Loading";
const Followers = ({ userId }) => {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();
  const { followers = [] } = useSelector(profileState);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getFollowers = async () => {
      setLoading(true);
      try {
        const data = await makeRequest.get(`/followers/${userId}`);
        if (data.isSuccess) {
          dispatch(setFollower(data.followers));
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getFollowers();
  }, [dispatch, userId]);

  const navigateToUser = (username) => {
    if (username === currentUser?.username) {
      navigate(`/profile`);
    } else {
      navigate(`/${username}`);
    }
  };

  const handleRemoveFollower = (userId) => {};

  useEffect(() => {
    return () => {
      console.log("unmounting");
      dispatch(setFollower([]));
    };
  }, []);
  return (
    <FadeInAnimation>
      <div className="flex h-screen items-center justify-center">
        <div className="w-96  bg-white dark:bg-gray-950 border rounded-lg ">
          <div className=" text-black dark:text-white text-center w-full p-3 ">
            <h2 className="text-xl">Followers</h2>
          </div>
          <hr />
          <div>
            <div className="w-full p-2">
              <Input
                type="text"
                className="w-full p-3 outline-none border-none ml-5 focus:outline-none focus:ring-0 bg-transparent"
                placeholder="search"
                prefix={<Search className="text-gray-800" />}
              />
            </div>
          </div>
          <div className="overflow-y-scroll h-[500px]">
            {!loading &&
              followers?.map((user) => (
                <div className="m-3" key={user?._id}>
                  <div className="flex items-center dark:bg-slate-600 justify-between space-x-2 hover:scale-90 duration-500 bg-slate-50 shadow-lg m-2 p-2 rounded-lg  ">
                    <div className="flex items-center space-x-2">
                      <img
                        className="inline-block h-12 w-12 rounded-full hover:scale-90 duration-500 object-cover"
                        src={user?.avatar || avatar}
                        alt={user?.username}
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
                      <FollowButton
                        {...user}
                        onClick={() => handleRemoveFollower(user?._id)}
                        className="text-xs bg-sky-500 px-2 rounded-xl text-sky-100 py-1"
                      />
                    )}
                  </div>
                </div>
              ))}

            {loading && [1, 2, 3, 4, 5, 6].map((id) => <Loading key={id} />)}
          </div>
        </div>
      </div>
    </FadeInAnimation>
  );
};

export default Followers;
