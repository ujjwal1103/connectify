import Suggetion from "./Suggetion";
import Self from "../self/Self";
import { setSuggetions } from "../../redux/services/suggetionSlice";
import { useFetchData } from "../../utils/useFetchData";

const Suggetions = () => {
  const { user } = JSON.parse(localStorage.getItem("user"));
  // const { suggestedusers } = useSelector((state) => state.suggetions);

  const { suggestedusers } = useFetchData(
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
      {suggestedusers?.map((u) => (
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
