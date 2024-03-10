import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImage } from "./cropImage";
import { CheckBoxBlankLine, ZoomIn } from "../../icons";

const ImageCrop = ({
  image,
  onCrop,
  onClose,
  cropShape = "rect",
  scale = 1,
  aspect: as = 3,
  profile = false,
  name,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(scale);
  const [rotate, setRotate] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [aspect, setAspect] = useState(as);
  const [openZoom, setOpenZoom] = useState(false);
  const cropComplte = (_, cap) => {
    setCroppedAreaPixels(cap);
  };

  const cropImage = async () => {
    try {
      const { file, url } = await getCroppedImage(
        image,
        name,
        croppedAreaPixels,
        rotate
      );

      onCrop(file, url);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="fixed inset-0 flex justify-center  items-center ">
      <div className="relative flex box-border rounded-md overflow-clip justify-center items-center flex-col w-96 ">
        <div className="bg-zinc-900 box-border items-center flex justify-between w-full text-center text-xl font-bold p-2">
          <button
            type="button"
            className="text-white text-sm  rounded-md p-2"
            onClick={onClose}
          >
            Cancel
          </button>{" "}
          <button
            type="button"
            className="bg-white text-black rounded-md p-1 text-base"
            onClick={cropImage}
          >
            Next
          </button>
        </div>
        <div className=" relative w-full h-full  aspect-square  bg-black">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotate}
            aspect={4 / aspect}
            onZoomChange={setZoom}
            onRotationChange={setRotate}
            onCropChange={setCrop}
            onCropComplete={cropComplte}
            cropShape={cropShape}
            restrictPosition={true}
            showGrid={false}
          />
        </div>
        {openZoom && (
          <div className="absolute bg-slate-50  bottom-2 rounded-md shadow-md left-30 p-2 flex gap-3">
            <input
              type="range"
              name="zoom"
              id=""
              min={1}
              max={3}
              step={0.1}
              className=" accent-zinc-900 h-2 "
              value={zoom}
              onChange={(e) => setZoom(e.target.value)}
            />
          </div>
        )}
        {!profile && (
          <div className="absolute bottom-0 left-0 p-2 flex gap-3">
            <button
              className="bg-zinc-600 shadow-md p-1 rounded-md dark:text-white"
              onClick={() => setAspect((prev) => (prev === 3 ? 4 : 3))}
            >
              <CheckBoxBlankLine size={24} />
            </button>
            <button
              className="bg-zinc-600 shadow-md p-1 rounded-md dark:text-white"
              onClick={() => setOpenZoom(!openZoom)}
            >
              <ZoomIn size={24} />
            </button>
          </div>
        )}
        {/* <div className=" w-full text-black flex flex-col p-3">
          <div className="flex flex-col text-white">
            <label htmlFor="zoom">Zoom</label>
            <input
              type="range"
              name="zoom"
              id=""
              min={1}
              max={3}
              step={0.1}
              className=" accent-blue-500"
              value={zoom}
              onChange={(e) => setZoom(e.target.value)}
            />
          </div>
          <div className="flex flex-col text-white">
            {" "}
            <label htmlFor="Rotate">Rotate</label>
            <input
              type="range"
              name="rotate"
              id=""
              max={360}
              step={1}
              value={rotate}
              className="block accent-blue-500"
              onChange={(e) => setRotate(e.target.value)}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ImageCrop;
