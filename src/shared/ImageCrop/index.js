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
  onImagePick = () => {},
  cropedImagesUrls = [],
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

  const cropImage = async (allowNext = false) => {
    try {
      const { file, url } = await getCroppedImage(
        image,
        name,
        croppedAreaPixels,
        rotate
      );

      onCrop(file, url, allowNext);

      !allowNext && onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImagePick = (e) => {
    cropImage(true);
    onImagePick(e);
  };

  return (
    <div className="fixed inset-0 flex justify-center  items-center ">
      <div className="flex flex-col gap-4 p-4">
        {cropedImagesUrls?.map((img) => (
          <div>
            <img src={img} className="w-32 rounded-md "/>
          </div>
        ))}
      </div>
      <div className="relative flex box-border rounded-md overflow-clip justify-center items-center flex-col w-96 ">
        <div className="bg-zinc-900 box-border items-center flex justify-between w-full text-center text-xl font-bold p-2">
          <button
            type="button"
            className="text-white text-sm  rounded-md p-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-white text-black rounded-md p-1 text-base"
            onClick={() => cropImage(false)}
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
          <div className="absolute bottom-0 left-0 p-2 flex gap-3  w-full">
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
            <div className="self-center ml-auto">
              <input
                type="file"
                name="imagePicker"
                id="imagePicker"
                hidden
                onChange={handleImagePick}
              />
              <label
                className="w-12  cursor-pointer flex justify-center items-center bg-white"
                htmlFor="imagePicker"
              >
                Add
              </label>
            </div>
          </div>
        )}
      </div>

      
    </div>
  );
};

export default ImageCrop;
