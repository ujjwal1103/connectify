import React, { useRef, useState } from "react";
import { useEffect } from "react";

const EditImage = ({ imageSrc }) => {
  const [saturation, setSaturation] = useState(100);
  const canvasRef = useRef(null);
  const inputRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();

    image.src = imageSrc;

  // Replace with your image URL

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, image.width, image.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      adjustSaturation(saturation, imageData, ctx);
    };
  }, [saturation, imageSrc]);

  const handleSaturationChange = (e) => {
    setSaturation(e.target.value);
  };

  const adjustSaturation = (value, imageData, ctx) => {
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];

      // Convert RGB to HSL
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const l = (max + min) / 2;
      const d = max - min;
      let s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));

      // Adjust saturation
      s *= value / 100;

      // Convert HSL back to RGB
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(((l / 60) % 2) - 1));
      const m = l - c / 2;

      let rgb1, rgb2, rgb3;

      if (0 <= l && l < 60) {
        rgb1 = c;
        rgb2 = x;
        rgb3 = 0;
      } else if (60 <= l && l < 120) {
        rgb1 = x;
        rgb2 = c;
        rgb3 = 0;
      } else if (120 <= l && l < 180) {
        rgb1 = 0;
        rgb2 = c;
        rgb3 = x;
      } else if (180 <= l && l < 240) {
        rgb1 = 0;
        rgb2 = x;
        rgb3 = c;
      } else if (240 <= l && l < 300) {
        rgb1 = x;
        rgb2 = 0;
        rgb3 = c;
      } else if (300 <= l && l < 360) {
        rgb1 = c;
        rgb2 = 0;
        rgb3 = x;
      }

      const r1 = (rgb1 + m) * 255;
      const g1 = (rgb2 + m) * 255;
      const b1 = (rgb3 + m) * 255;

      imageData.data[i] = r1;
      imageData.data[i + 1] = g1;
      imageData.data[i + 2] = b1;
    }

    ctx.putImageData(imageData, 0, 0);
  };

  return (
    <div className="w-screen h-screen fixed inset-0 flex justify-center items-center bg-white">
      <input
        type="range"
        min="0"
        max="200"
        value={saturation}
        onChange={handleSaturationChange}
        ref={inputRef}
      />
      <canvas ref={canvasRef} className="bg-red-400  rounded-md"></canvas>
    </div>
  );
};

export default EditImage;
