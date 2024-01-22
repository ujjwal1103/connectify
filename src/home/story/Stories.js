import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPreviousStory,
  setNextStory,
} from "../../redux/services/storySlice";
import {
  ChevronBackCircle,
  ChevronForwardCircle,
  ThreeDots,
} from "../../icons";
import Slider from "../../common/Slider";

const Stories = ({ setClose }) => {
  const { story, shouldExit } = useSelector((state) => state.story);
  const { user } = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [menu, setMenu] = useState(false);

  const nextImage = useCallback(() => {
    if (currentIndex === story.stories.length - 1) {
      dispatch(setNextStory(story._id));

      setTimer(0);
      if (shouldExit) {
        setClose();
      }
      return;
    }

    setCurrentIndex((prevIndex) => prevIndex + 1);
    setTimer(0);
  }, [
    currentIndex,
    dispatch,
    setClose,
    shouldExit,
    story._id,
    story.stories.length,
  ]);

  const prevImage = () => {
    if (currentIndex === 0) {
      dispatch(setPreviousStory(story._id));
      setTimer(0);
      return;
    }

    setCurrentIndex((prevIndex) => prevIndex - 1);
    setTimer(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 15000);

    return () => clearInterval(interval);
  }, [nextImage]);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer < 150) {
        setTimer((prevTimer) => prevTimer + 7.5);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  console.log(story);

  const handleList = () => {
    setMenu(!menu);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-800 p-2 flex justify-center items-center">
      <div>
        <button className="absolute right-10 top-10" onClick={setClose}>
          close
        </button>
      </div>
      <div className="relative w-96 h-[650px] bg-gray-950 flex flex-col justify-start items-start rounded-xl">
        <div className="relative h-full">
          <button onClick={prevImage} className="absolute top-1/2 -left-24 ">
            <ChevronBackCircle size={34} />
          </button>
          <button onClick={nextImage} className="absolute top-1/2 -right-24 ">
            <ChevronForwardCircle size={34} />
          </button>
          <img
            src={story.stories[currentIndex]?.content}
            alt=""
            className="object-cover h-full  w-96 flex-1 z-0 rounded-xl"
          />
        </div>

        <div className="absolute top-0 w-full p-2">
          <div className="w-full flex gap-2 h-1 ">
            {story.stories.map((_, index) => (
              <span 
              key={index}
                className={`  w-full  rounded-md overflow-hidden ${
                  index === currentIndex ? "bg-green-500 " : "bg-gray-500 "
                }`}
              >
                {currentIndex === index && <Slider value={timer} />}
              </span>
            ))}
          </div>
          <div className=" w-full p-2 flex  items-center justify-between">
            <div className="flex items-center gap-6">
              <img
                src={story?.user?.profilePicture}
                alt=""
                className="w-12 h-12 rounded-full "
              />
              <span className="font-bold">{story?.user?.username}</span>
            </div>
            <button onClick={handleList}>
              <ThreeDots size={24} />
            </button>
          </div>
        </div>
      </div>

      {menu && (
        <div
          className="bg-black bg-opacity-50
       fixed inset-0 w-screen h-screen flex justify-center items-center"
        >
          <div className="rounded-lg bg-black/60 py-3 w-52 flex flex-col">
            {story?.user?._id === user._id && (
              <button className="p-2 border-b-2">Delete</button>
            )}
            <button className="p-2 border-b-2" onClick={() => setMenu(false)}>
              Cancle
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
