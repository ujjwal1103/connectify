import Post from "./post/Post";
import Suggetions from "./suggetions/Suggetions";
import { setFeeds, setError } from "../redux/services/feedSlice";
import Loading from "../common/Loading";
import ErrorPage from "../common/ErrorPage";
import Story from "./story/Story";
import Sidebar from "./components/Sidebar";
import { useFetchData } from "../utils/useFetchData";

const HomePage = () => {
  const { feeds, loading, error } = useFetchData(
    "/posts",
    "posts",
    "feed",
    setFeeds,
    setError
  );

  if (loading) {
    return <Loading />;
  }

  console.log(error, "error");
  if (error) {
    return <ErrorPage error={error} />;
  }

  if (feeds.length === 0) {
    return (
      <div className="fixed inset-0 flex justify-center items-center ">
        <h1 className="text-xl dark:text-gray-50 font-medium">
          No feeds found
        </h1>
      </div>
    );
  }

  return (
    <div className=" flex w-full p-4 lg:gap-10 flex-col dark:bg-slate-900 z-10">
      <div className="flex justify-start px-2">
        <Story />
      </div>
      <div className="flex lg:gap-10">
        <Sidebar />
        <div className="flex flex-1 gap-10 justify-between z-10">
          <div className=" grid grid-cols-1 flex-1 flex-col  gap-10 ">
            {feeds.map((post, i) => (
              <Post key={post._id} post={post} />
            ))}
          </div>
          <Suggetions />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
