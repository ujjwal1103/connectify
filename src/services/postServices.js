import { storage } from "../config/firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Resizer from "react-image-file-resizer";

export const resizeFile = (file) =>
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
      "file"
    );
  });

export const imageFileUpload = async (file, folderName) => {
  const resizedImage = await resizeFile(file);
  const fileRef = ref(storage, `${folderName}/${resizedImage.name}`);
  const res = await uploadBytes(fileRef, resizedImage);
  if (res) {
    const url = await getDownloadURL(fileRef);
    return url;
  }
  return null;
};


