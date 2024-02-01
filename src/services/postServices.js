import Resizer from "react-image-file-resizer";

export const resizeFile = (file, type) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "jpg",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      type
    );
  });
