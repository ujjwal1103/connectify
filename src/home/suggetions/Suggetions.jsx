import Suggetion from "./Suggetion";
import Self from "../self/Self";
import { setSuggetions } from "../../redux/services/suggetionSlice";
import { useFetchData } from "../../utils/useFetchData";
import UserLoading from "../../common/loading/UserLoading";

const Suggetions = () => {
  const { user } = JSON.parse(localStorage.getItem("user"));
  const { suggestedusers, loading } = useFetchData(
    "users",
    "users",
    "suggetions",
    setSuggetions
  );

  return (
    <div className="hidden lg:block">
      <Self />
      {suggestedusers?.length > 0 && (
        <div className="p-2 mx-2 flex justify-between dark:text-gray-100">
          <span>Suggested for you</span>
          <span>see all</span>
        </div>
      )}
      {loading && (
        <div className="mt-10 flex gap-2 flex-col">
          {[1, 2, 3, 4, 5].map((i) => (
            <UserLoading />
          ))}
        </div>
      )}
      {!loading && suggestedusers?.map((u) => (
        <Suggetion
          key={u?._id}
          user={u}
          username={user?.username}
          userId={user?._id}
        />
      ))}
    </div>
  );
};

export default Suggetions;
