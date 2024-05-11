import React, { useRef, useState, useEffect } from "react";
import ProfilePicture from "./ProfilePicture";
import FollowBtn from "../shared/Buttons/FollowBtn";
import { LikeButton } from "../home/post/components/PostActions";
import { CommentIcon, FaPause, FaPlay, Send } from "../icons";
import { AdvancedVideo, lazyload } from '@cloudinary/react';
import { scale, fill } from '@cloudinary/url-gen/actions/resize';
import { AutoFocus } from '@cloudinary/url-gen/qualifiers/autoFocus';
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focusOn';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { cld } from "../config/api.config";

export function Reel({ p }) {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Indicates the amount of intersection between the target element and its root (0.5 means when 50% of the video is in the viewport)
    };

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsPlaying(true);
          videoRef.current.play();
        } else {
          setIsPlaying(false);
          videoRef.current.pause();
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    const target = videoRef.current;
    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, []);

  useEffect(() => {
    console.log(
      cld
        .video("videos/apartment-tour")
        .resize(
          fill()
            .width(400)
            .aspectRatio("1:1")
            .gravity(autoGravity().autoFocus(AutoFocus.focusOn(FocusOn.face())))
        )
        .delivery("q_auto")
        .format("auto")
    );
  }, []);

  return (
    <section className="h-dvh lg:m-2 lg:p-10 lg:w-[500px] w-screen mx-auto  snap-start  relative">
      <video className="w-full h-full object-cover" ref={videoRef}>
        <source
          src={
            "https://res.cloudinary.com/dtzyaxndt/video/upload/v1714886040/6636fa88e8f3a7fa9f774208/messagesAttachments/884B719CD7857556611ED7EFFA1EC187_video_dashinit_ehppmy.mp4"
          }
          type="video/mp4"
        />
      </video>

      <div className=" absolute inset-0 bg-transparent lg:m-10 flex  flex-col justify-end">
        <div className=" flex">
          <div className="w-[80%]">
            <div className="bg-transparent h-44"></div>
            <div className="flex gap-3 items-center p-3">
              <ProfilePicture
                src={p?.user?.avatar}
                className={"size-10 rounded-full"}
              />
              <div>
                <span>{p?.user?.username}</span>
              </div>
              <FollowBtn userId={p.user._id} />
            </div>
            <div className="p-3 ">
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                eius delectus accusamus?
              </span>
            </div>
          </div>
          <div className=" w-[20%] flex justify-end">
            <div className="py-5  w-full self-end">
              <ul className="flex flex-col gap-5 w-full  justify-center items-center">
                <li className="flex flex-col gap-1  w-full justify-center items-center">
                  <LikeButton />
                  <span>Likes</span>
                </li>
                <li className="flex flex-col gap-1  w-full justify-center items-center">
                  <CommentIcon
                    size={24}
                    className="hover:text-gray-600 dark:text-gray-50 cursor-pointer" // onClick={showCurrentPost}
                  />
                  <span>35</span>
                </li>
                <li className="flex flex-col gap-1  w-full justify-center items-center">
                  {" "}
                  <Send // onClick={() => setSendPost(true)}
                    size={24}
                    className="hover:text-gray-600 dark:text-gray-50 cursor-pointer"
                  />
                  <span>3444</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className=" absolute inset-0 bg-transparent lg:m-10 flex  flex-col justify-end">
        <div className="flex peer">
          <button
            onClick={() => {
              if (isPlaying) {
                videoRef.current.pause();
              } else {
                videoRef.current.play();
              }
              setIsPlaying(!isPlaying);
            }}
            className=" text-white peer-hover:visible font-bold py-2 px-4 rounded absolute top-4 left-4 z-50"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>
      </div>
    </section>
  );
}
