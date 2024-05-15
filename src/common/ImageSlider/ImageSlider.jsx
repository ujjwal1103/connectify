import { useEffect, useRef, useState } from "react";

import "./image-slider.css";
import {
  ChevronBack,
  ChevronForward,
  CircleDot,
  Circle,
  FaPlay,
} from "../../icons";
import { ImageComponent } from "../../profile/components/Post";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";
import { useInView } from "framer-motion";
import { cn } from "../../utils/helper";

export function ImageSlider({ images, height = "50%" }) {
  const [currentImages, setCurrentImages] = useState();
  const [imageIndex, setImageIndex] = useState(0);
  const [singleImage, setSingleImage] = useState(currentImages?.length === 1);

  useEffect(() => {
    setCurrentImages(images);
    setSingleImage(images.length === 1);
  }, [images]);

  function showNextImage() {
    setImageIndex((index) => {
      if (index === currentImages.length - 1) return 0;
      return index + 1;
    });
  }

  function showPrevImage() {
    setImageIndex((index) => {
      if (index === 0) return currentImages.length - 1;
      return index - 1;
    });
  }

  if (!currentImages?.length) {
    return null;
  }

  return (
    <section
      aria-label="Image Slider"
      className="overflow-hidden"
      style={{ width: "100%", height: height, position: "relative" }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {currentImages?.map(({ url, type }, index) => {
          if (type === "VIDEO") {
            return <VideoPlayer index={imageIndex} url={url} />;
          } else {
            return (
              <ImageComponent
                key={url}
                src={url}
                alt={url}
                loaderClassName={` bg-zinc-950 animate-pulse w-full h-[400px]`}
                aria-hidden={imageIndex !== index}
                className={"img-slider-img overflow-hidden"}
                style={{ translate: `${-100 * imageIndex}%` }}
              />
            );
          }
        })}
      </div>

      {!singleImage && (
        <button
          onClick={showPrevImage}
          className={cn("img-slider-btn ")}
          style={{ left: 0,top:'50%'   }}
          aria-label="View Previous Image"
        >
          <ChevronBack aria-hidden />
        </button>
      )}
      {!singleImage && (
        <button
          onClick={showNextImage}
          className={cn("img-slider-btn ")}
          style={{ right: 0,top:'50%' }}
          aria-label="View Next Image"
        >
          <ChevronForward aria-hidden />
        </button>
      )}

      {!singleImage && (
        <div
          style={{
            position: "absolute",
            bottom: ".5rem",
            left: "50%",
            translate: "-50%",
            display: "flex",
            gap: ".25rem",
          }}
        >
          {currentImages?.map((_, index) => (
            <button
              key={index}
              className="img-slider-dot-btn"
              aria-label={`View Image ${index + 1}`}
              onClick={() => setImageIndex(index)}
            >
              {index === imageIndex ? (
                <CircleDot aria-hidden />
              ) : (
                <Circle aria-hidden />
              )}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

const VideoPlayer = ({ index, url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mute, setMute] = useState(true);
  const videoRef = useRef(null);
  const isInView = useInView(videoRef);

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

  useEffect(() => {
    if (isInView) {
      setIsPlaying(true);
      playVideo();
    } else {
      setIsPlaying(false);
      pauseVideo();
    }
  }, [isInView]);

  return (
    <div
      className="relative img-slider-img overflow-hidden"
      style={{ translate: `${-100 * index}%` }}
    >
      <video
        className="w-full"
        onClick={togglePlay}
        ref={videoRef}
        muted={mute}
      >
        <source src={url} type="video/mp4" />
      </video>
      {!isPlaying && (
        <button
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-85 rounded-full p-2"
          onClick={togglePlay}
        >
          <FaPlay />
        </button>
      )}
      {
        <button
          className="absolute right-2 z-10 bottom-2 transform  bg-black bg-opacity-85 rounded-full p-2"
          onClick={() => setMute(!mute)}
        >
          {mute ? <BiVolumeMute /> : <BiVolumeFull />}
        </button>
      }
    </div>
  );
};

const MuteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
    />
  </svg>
);
