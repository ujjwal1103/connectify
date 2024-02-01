import { useState } from "react";

import "./image-slider.css";
import { ChevronBack, ChevronForward, CircleDot, Circle } from "../../icons";

export function ImageSlider({ images, className }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [singleImage, _] = useState(images.length === 1);
  function showNextImage() {
    setImageIndex((index) => {
      if (index === images.length - 1) return 0;
      return index + 1;
    });
  }

  function showPrevImage() {
    setImageIndex((index) => {
      if (index === 0) return images.length - 1;
      return index - 1;
    });
  }

  return (
    <section
      aria-label="Image Slider"
      className="overflow-hidden"
      style={{ width: "100%", height: "50%", position: "relative" }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {images.map((url, index) => (
          <img
            key={url}
            src={url}
            alt={url}
            aria-hidden={imageIndex !== index}
            className={'img-slider-img overflow-hidden' }
            style={{ translate: `${-100 * imageIndex}%` }}
          />
        ))}
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
          {images.map((_, index) => (
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
