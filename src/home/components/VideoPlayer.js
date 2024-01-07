import React, { useRef, useState } from "react";

const VideoPlayer = () => {
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
            src="https://scontent.cdninstagram.com/o1/v/t16/f1/m69/GBcIXxJMeI9l8e8DAKjM01heIPAybpR1AAAF.mp4?efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uY2xpcHMuYzIuMTA4MC5oaWdoIn0&_nc_ht=instagram.fhyd1-3.fna.fbcdn.net&_nc_cat=105&vs=361534163131244_79935844&_nc_vs=HBksFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HQmNJWHhKTWVJOWw4ZThEQUtqTTAxaGVJUEF5YnBSMUFBQUYVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dPS2M1UkpvUDN0YXhWVUJBQ3FCRUdiTF9CSW9icFIxQUFBRhUCAsgBACgAGAAbABUAACaW7Z%2F35ve9PxUCKAJDMywXQBwhysCDEm8YEmRhc2hfaGlnaF8xMDgwcF92MREAdf4HAA%3D%3D&_nc_rid=487655d907&ccb=9-4&oh=00_AfCkoFyuNz184nypiQS0aDqJ0Eqi89zTP6VSDFKo3urthA&oe=6592BE67&_nc_sid=65462d" // Replace 'source' with your video URL
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
