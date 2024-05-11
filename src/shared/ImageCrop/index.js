import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImage } from "./cropImage";
import { CheckBoxBlankLine, ImagePlus, ZoomIn } from "../../icons";
import { IoClose } from "react-icons/io5";
import FadeInAnimation from "../../utils/Animation/FadeInAnimation";


const ImageCrop = ({
  onCrop,
  onClose,
  cropShape = "rect",
  scale = 1,
  aspect: as = 400,
  profile = false,
  onImagePick = () => {},
  cropedImagesUrls = [],
  clearImage,
  selectedImage,
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
      if (selectedImage?.type === "IMAGE") {
        const { file, url } = await getCroppedImage(
          selectedImage.originalImageUrl,
          selectedImage.originalImage.name,
          croppedAreaPixels,
          rotate
        );
        onCrop(file, url, allowNext);
      } else {
        onCrop(
          selectedImage.originalImage,
          selectedImage.originalImageUrl,
          allowNext
        );
      }

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
    <div className="fixed inset-0 flex justify-center flex-col-reverse items-center ">
      <div className="flex gap-4 p-4">
        {cropedImagesUrls?.map((img) => (
          <FadeInAnimation>
            <div className="relative">
              <button
                className="absolute  text-white font-semibold bg-red-500 p-1 -top-2 -left-2  rounded-md "
                onClick={() => {
                  clearImage(img.name);
                }}
              >
                <IoClose size={16} />
              </button>
              <img src={img.url} className="w-32 rounded-md " alt={img.name} />
            </div>
          </FadeInAnimation>
        ))}
      </div>
      <div className="relative flex box-border rounded-md overflow-clip justify-center items-center flex-col w-96 ">
        <div className="bg-zinc-900 box-border items-center flex justify-between w-full text-center text-xl font-bold p-2">
          <button
            type="button"
            className="text-white text-sm  rounded-md p-2"
            onClick={() => onClose(selectedImage.originalImage.name)}
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
        <div className=" relative w-[400px] h-[400px]  aspect-square  bg-black">
          <Cropper
          objectFit="cover"
            image={
              selectedImage?.type === "IMAGE" && selectedImage.originalImageUrl
            }
            video={
              selectedImage?.type !== "IMAGE" && selectedImage.originalImageUrl
            }
            crop={crop}
            zoom={zoom}
            rotation={rotate}
            cropSize={{
              width: 400,
              height: aspect,
            }}
            onZoomChange={setZoom}
            onRotationChange={setRotate}
            onCropChange={setCrop}
            onCropComplete={cropComplte}
            cropShape={cropShape}
            restrictPosition={true}
            showGrid={false}

            classes={{
              containerClassName: "h-full w-full object-cover",
        
              cropAreaClassName: " object-cover ",
            }}
          />
        </div>
        {openZoom && (
          <div className="absolute bottom-14 bg-slate-50   rounded-md shadow-md left-30 p-2 flex gap-3">
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
              className="bg-zinc-600 shadow-md p-1 w-12 flex-center rounded-md dark:text-white"
              onClick={() => setAspect((prev) => (prev === 400 ? 250 : 400))}
            >
              <CheckBoxBlankLine size={24} />
            </button>
            <button
              className="bg-zinc-600 shadow-md p-1 w-12 flex-center rounded-md dark:text-white"
              onClick={() => setOpenZoom(!openZoom)}
            >
              <ZoomIn size={24} />
            </button>
            {cropedImagesUrls.length < 3 && (
              <div className="self-center ml-auto">
                <input
                  type="file"
                  name="imagePicker"
                  id="imagePicker"
                  hidden
                  accept="image/*"
                  onChange={handleImagePick}
                />
                <label
                  className="w-12 h-12 border border-dashed rounded-md cursor-pointer flex justify-center items-center text-white"
                  htmlFor="imagePicker"
                >
                  <ImagePlus size={24} />
                </label>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCrop;
