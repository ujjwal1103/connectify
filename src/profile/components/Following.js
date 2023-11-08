import { makeRequest } from "../../config/api.config";
import { useEffect, useState } from "react";
import avatar from "../../assets/man.png";
import { useNavigate } from "react-router-dom";
import { OutlineClose, Search } from "../../icons";
import Input from "../../common/InputFields/Input";

const Following = ({ userId, setClose }) => {
  const [followers, setFollowers] = useState([]);
  const { user: currentUser } = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const { data } = await makeRequest.get(`/user/following/${userId}`);
        if (data.isSuccess) {
          setFollowers(data.users);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFollowers();
  }, [userId]);

  const navigateToUser = (username) => {
    setClose();
    if (username === currentUser?.username) {
      navigate(`/profile`);
    } else {
      navigate(`/${username}`);
    }
  };

  return (
    <div className="z-[999] fixed inset-0 bg-black bg-opacity-70 flex h-full items-center justify-center">
      <div className="w-96 h-96 bg-white dark:bg-gray-950 rounded-lg ">
        <button
          className="absolute text-white top-10 right-10"
          onClick={setClose}
        >
          <OutlineClose size={34} />
        </button>
        <div className=" text-black text-center w-full p-3 ">
          <h2 className="text-xl">Following</h2>
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
        <div className="overflow-y-scroll h-full">
          {followers?.map((user) => (
            <div className="m-3" key={user?._id}>
              <div className="flex items-center dark:bg-slate-600 justify-between space-x-2 hover:scale-90 duration-500 bg-slate-50 shadow-lg m-2 p-2 rounded-lg  ">
                <div className="flex items-center space-x-2">
                  <img
                    className="inline-block h-12 w-12 rounded-full hover:scale-90 duration-500 object-cover"
                    src={user?.profilePicture || avatar}
                    alt={user?.username}
                  />
                  <span
                    onClick={() => navigateToUser(user?.username)}
                    className="flex flex-col"
                  >
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {user?.name}
                    </span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {user?.username}
                    </span>
                  </span>
                </div>
                {user?.isFollowed ? (
                  <button className="text-xs bg-sky-500 px-2 rounded-xl text-sky-100 py-1">
                    Following
                  </button>
                ) : user?.username === currentUser.username ? (
                  ""
                ) : (
                  <button
                    className="text-xs bg-sky-500 px-2 rounded-xl text-sky-100 py-1"
                    // onClick={}
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Following;
