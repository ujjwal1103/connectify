import { blobToFile } from "../../utils/blobToFile";

export const createIamge = (url) => {
  return new Promise((res, rej) => {
    const image = new Image();
    image.addEventListener("load", () => res(image));
    image.addEventListener("error", (e) => rej(e));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
};

export const getRadiantAngle = (degVal) => {
  return (degVal * Math.PI) / 100;
};

export const rotateSize = (width, height, rotation) => {
  const rotRad = getRadiantAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
};

export const getCroppedImage = async (
  imageSrc,
  name,
  pixelCrop,
  rotation = 0,
  flip = { hotizontal: false, verticle: false }
) => {
 
  const image = await createIamge(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const rotRad = getRadiantAngle(rotation);

  const { width: bBoxWidth, height: bBoxheight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  console.log(bBoxWidth, bBoxheight)

  canvas.width = bBoxWidth;
  canvas.height = bBoxheight;

  ctx.translate(bBoxWidth / 2, bBoxheight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.hotizontal ? -1 : 1, flip.verticle ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  console.log(pixelCrop)

  ctx.putImageData(data, 0, 0);

  return new Promise((res, rej) => {
    canvas.toBlob((blob) => {
      const file = blobToFile(blob, name, blob.type);
      res({ file, url: URL.createObjectURL(blob) });
    }, "image/jpeg");
  });
};
