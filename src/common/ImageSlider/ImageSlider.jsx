import { useEffect, useState } from "react";

import "./image-slider.css";
import { ChevronBack, ChevronForward, CircleDot, Circle } from "../../icons";
import { ImageComponent } from "../../profile/components/Post";

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
            return (
              <video style={{ translate: `${-100 * imageIndex}%` }} className={"img-slider-img overflow-hidden"} >
                <source src={url} />
              </video>
            );
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
          className="img-slider-btn"
          style={{ left: 0 }}
          aria-label="View Previous Image"
        >
          <ChevronBack aria-hidden />
        </button>
      )}
      {!singleImage && (
        <button
          onClick={showNextImage}
          className="img-slider-btn"
          style={{ right: 0 }}
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
