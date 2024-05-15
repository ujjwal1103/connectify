import React, { useRef, useState } from "react";

const VideoPlayer = ({url}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoRef = useRef(null);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(!isPlaying);
      pauseVideo();
    } else {
      setIsPlaying(!isPlaying);
      playVideo();
    }
  };

  return (
    <div className="flex justify-center items-center max-w-lg mx-auto   rounded-md ">
      <div className="relative  h-auto w-52 ">
        <video
          className=" top-0 w-52 rounded-md "
          onClick={togglePlay}
          autoPlay={true}
          ref={videoRef}
        >
          <source
            src={url} // Replace 'source' with your video URL
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {!isPlaying && (
          <button
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2"
            onClick={togglePlay}
          >
            ▶️
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
