import React, { useRef, useEffect } from "react";

const EditImage = ({ imageUrl  }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cropImage = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const image = new Image();

      image.onload = () => {
        const aspectRatio = image.width / image.height;

        // Set canvas dimensions
        canvas.width = 200; // Width
        canvas.height = 500; // Height

        let sx = 0;
        let sy = 0;
        let sWidth = image.width;
        let sHeight = image.height;

        // Calculate cropping dimensions
        if (aspectRatio > canvas.width / canvas.height) {
          sWidth = canvas.width * aspectRatio;
          sx = (image.width - sWidth) / 2;
        } else {
          sHeight = canvas.height * (1 / aspectRatio);
          sy = (image.height - sHeight) / 2;
        }

        // Draw cropped image on canvas
        ctx.drawImage(
          image,
          sx,
          sy,
          sWidth,
          sHeight,
          0,
          0,
          canvas.width,
          canvas.height
        );
      };

      image.src = imageUrl;
    };

    cropImage();
  }, [imageUrl]);

  return (
    <div className="w-screen h-screen fixed left-0 top-0 flex justify-center items-center">
      {/* <input
        type="range"
        min="0"
        max="200"
        value={saturation}
        onChange={handleSaturationChange}
        ref={inputRef}
      /> */}
      <canvas
        ref={canvasRef}
        className="bg-red-400 w-1/2 h-96 rounded-md"
      ></canvas>
    </div>
  );
};

export default EditImage;
