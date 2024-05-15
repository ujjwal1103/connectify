import Suggetion from "./Suggetion";
import Self from "../self/Self";
import { setSuggetions } from "../../redux/services/suggetionSlice";
import { useFetchData } from "../../utils/useFetchData";
import UserLoading from "../../common/loading/UserLoading";
import { Link } from "react-router-dom";
import { getUsersSuggetions } from "../../api";

const Suggetions = () => {
  const { user } = JSON.parse(localStorage.getItem("user"));
  const { suggestedusers, loading } = useFetchData(
    ()=>getUsersSuggetions(1, 5),
    "users",
    "suggetions",
    setSuggetions
  );

  return (
    <div className="hidden md:block lg:block">
      <Self />
      {suggestedusers?.length > 0 && (
        <div className="p-2 mx-2 flex justify-between dark:text-gray-100">
          <span>Suggested for you</span>
          <Link to="/expore/people" className="text-link text-sm">see all</Link>
        </div>
      )}
      {loading && (
        <div className="mt-10 flex gap-2 flex-col">
          {[1, 2, 3, 4, 5].map((i) => (
          <UserLoading key={i}/>
          ))}
        </div>
      )}
      {!loading &&
        suggestedusers?.map((u) => (
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
