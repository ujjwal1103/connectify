import { useState, useCallback, useEffect } from "react";
import { makeRequest } from "../../config/api.config";
import Stories from "./Stories";
import { useDispatch, useSelector } from "react-redux";
import { setStories, setStory } from "../../redux/services/storySlice";
import { Plus } from "../../icons";
import avatar from "../../assets/man.png";
import CreateStory from "../create/CreateStory";

const Story = () => {
  const [openStory, setOpenStory] = useState(false);
  const [openAddStory, setOpenAddStory] = useState(false);
  const dispatch = useDispatch();
  const { stories } = useSelector((state) => state.story);

  const fetchStories = useCallback(async () => {
    try {
      const res = await makeRequest("/stories");
      if (res.isSuccess) {
        dispatch(setStories(res.stories));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const handleStory = (story) => {
    dispatch(setStory(story));
    setOpenStory(true);
  };
  return (
    <div className="flex gap-4 flex-col">
      <div className="flex flex-col items-center gap-2 dark:text-white ">
        <div
          className="w-20 h-20  rounded-full outline outline-offset-2 outline-violet-500 flex justify-center items-center"
          onClick={() => setOpenAddStory(true)}
        >
          <Plus size={55} />
        </div>
        <span>Add Story</span>
      </div>
      {stories?.map((story) => (
        <div
          key={story}
          className="flex flex-col items-center gap-2 dark:text-white "
        >
          <img
            src={story?.user?.profilePicture || avatar}
            alt=""
            className="w-20 h-20 outline outline-offset-2 outline-violet-500 rounded-full"
            onClick={() => handleStory(story)}
          />
          <span>{story?.user?.username}</span>
          {openStory && <Stories setClose={() => setOpenStory(false)} />}
          {openAddStory && (
            <CreateStory setClose={() => setOpenAddStory(false)} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Story;
