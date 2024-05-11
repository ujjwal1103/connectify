import React, { useRef, useState } from "react";
import bgImage from "../assets/bg.jpg";
import { IoCropOutline } from "react-icons/io5";
import {
  FixedCropper,
  ImageRestriction,
  Priority,
  RectangleStencil,
  CircleStencil
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { TbRectangle } from "react-icons/tb";
import { FiSquare } from "react-icons/fi";
import { blobToFile } from "../utils/blobToFile";
const ImageCropper = ({name}) => {
  const [image, setImage] = useState(
    "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg"
  );
  const cropperRef = useRef(null);
  const [aspectRatio, setAspectRation] = useState(1 / 1);
  const [openCropOptions, setOpenCropOptions] = useState(false);

  const base64StringToFile = (base64String) => {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/octet-stream" });
    const file = new File([blob], "filename");
    return file;
  };

  const onCrop = () => {
    if (cropperRef.current) {
      cropperRef.current.getCanvas().toBlob((blob) => {
        const file = blobToFile(blob, name, blob.type);
        console.log(file);
      }, "image/jpeg");
    }

    console.dir( cropperRef.current.getCanvas())
  };

  return (
    <div className="bg-zinc-900 h-dvh w-dvw flex-center flex-col ">
      <div className="w-[500px] rounded-lg h-[500px] relative">
        <FixedCropper
          ref={cropperRef}
          backgroundWrapperClassName="bg-red-800 w-full h-[500px]"
          priority={Priority.visibleArea}
          stencilProps={{
            aspectRatio: aspectRatio,
            handlers: false,
            lines: false,
            movable: false,
            resizable: false,
            className: "overlay ",
          }}
          stencilSize={{
            width: 500,
            height: 500,
          }}
          src={image}
          className={"croppe w-[500px] h-[500px] cursor-move rounded-lg"}
          stencilComponent={CircleStencil}
          imageRestriction={ImageRestriction.fillArea}
        />
        <div className="absolute bottom-2 left-2">
          <button
            onClick={() => setOpenCropOptions(!openCropOptions)}
            className="size-10 rounded-full bg-black bg-opacity-65 flex-center"
          >
            <IoCropOutline size={24} />
          </button>
          <button
            onClick={onCrop}
            className="size-10 rounded-full bg-black bg-opacity-65 flex-center"
          >
            <IoCropOutline size={24} />
          </button>

          {openCropOptions && (
            <div className="absolute bottom-12 flex flex-col justify-center bg-black bg-opacity-80 w-20 rounded-lg">
              <button
                disabled={aspectRatio === 1 / 1}
                onClick={() => setAspectRation(1 / 1)}
                className="p-2 flex items-center gap-2 disabled:opacity-45"
              >
                <FiSquare size={24} /> <span>1/1</span>
              </button>
              <button
                disabled={aspectRatio === 4 / 3}
                onClick={() => setAspectRation(4 / 3)}
                className="p-2 flex items-center gap-2 disabled:opacity-45"
              >
                <TbRectangle size={24} /> <span>4/3</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
