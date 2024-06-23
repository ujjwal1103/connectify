import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

import imageIcon from "../../assets/gallery.png";
import { usePostSlice } from "../../redux/services/postSlice";
import { ImageSlider } from "../../common/ImageSlider/ImageSlider";
import { readFileAsDataURL } from "../../utils/helper";
import { uploadPosts } from "../../api";
import ImageCropper from "../../exp/ImageCropper";
import RichTextEditor from "../../shared/Components/RichTextEditor";

function extractCroppedImageUrls(data) {
  const croppedImageUrls = [];
  for (const key in data) {
    if (data.hasOwnProperty(key) && data[key].originalImageUrl) {
      const croppedImageUrl = {
        url: data[key].originalImageUrl,
        name: data[key].originalImage.name,
        file: data[key].croppedImage,
        type: data[key].type,
      };
      croppedImageUrls.push(croppedImageUrl);
    }
  }
  return croppedImageUrls;
}

const CreatePost = ({ onClose }) => {
  const [cropedImagesUrls, setCropedImagesUrls] = useState([]);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});
  const [openC, setOpenC] = useState(false);
  const [editCaption, setEditCaption] = useState(false);
  const [imageData, setImageData] = useState({});
  const location = useLocation();
  const [aspectRatio, setAspectRation] = useState(1 / 1);
  const { addPost, setUploadingPost } = usePostSlice();

  useEffect(() => {
    setCropedImagesUrls(extractCroppedImageUrls(imageData));
  }, [imageData]);

  const handleImagePick = async (e) => {
    setIsLoading(true);

    const file = e.target.files[0];
    const dataURL = await readFileAsDataURL(file);

    const isImageFile = file.type.includes("image");
    const isVideoFile = file.type.includes("video");

    if (!isImageFile && !isVideoFile) {
      setIsLoading(false);
      setOpenC(true);
      return;
    }

    const newImageData = {
      originalImage: file,
      originalImageUrl: dataURL,
      croppedImage: file,
      croppedImageUrl: "",
      type: isImageFile ? "IMAGE" : "VIDEO",
    };

    setSelectedImage(newImageData);
    setImageData((prev) => ({ ...prev, [file.name]: newImageData }));
    setIsLoading(false);
    setOpenC(true);
  };

  const handlePost = async () => {
    if (!cropedImagesUrls.length) {
      alert("Please select an image");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      for (let i = 0; i < cropedImagesUrls.length; i++) {
        formData.append("postImage", cropedImagesUrls[i].file);
      }
      formData.append("caption", caption || "");
      formData.append('aspectRatio',aspectRatio)

      const uploadPost = {
        loading: true,
        post: {
          images: cropedImagesUrls,
        },
      };

      setUploadingPost(uploadPost);
      onClose();
      const data = await uploadPosts(formData);

      if (data?.isSuccess && location.pathname === "/profile") {
        addPost(data.post);
      }
    } catch (error) {
      console.log("ERROR UPLOADING POST", error);
      toast.error("Error Uploading Post");
    } finally {
      setIsLoading(false);
      setUploadingPost({ loading: false, post: null });
    }
  };

  const deleteAndSet = (name) => {
    const data = { ...imageData };
    const filenames = Object.keys(data) || [];
    if (filenames.length <= 1) {
      reset();
      return;
    }

    const currentIndex = filenames.indexOf(name);
    let nextIndex;

    if (currentIndex === filenames.length - 1) {
      nextIndex = currentIndex - 1;
    } else {
      nextIndex = currentIndex;
    }

    delete data[name];
    setImageData(data);
    const image = data[filenames[nextIndex]];
    image && setSelectedImage(image);
  };

  const reset = () => {
    setCropedImagesUrls([]);
    setSelectedImage({});
    setImageData({});
    setOpenC(false);
    setEditCaption(false);
  };

  return (
    <motion.div
      transition={{ duration: 1 }}
      className="w-auto flex justify-center items-center overflow-clip bg-zinc-950 rounded-md"
    >
      {!openC && !editCaption && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-white justify-center min-w-[24rem]  min-h-[24rem] max-h-[24rem] h-[24rem] items-center flex flex-col gap-4 relative"
        >
          <div className="absolute right-3 top-3">
            <button onClick={onClose}>
              <IoClose size={20} />
            </button>
          </div>
          <div>
            <img src={imageIcon} alt="" srcset="" className="w-24 h-24" />
          </div>
          <label
            htmlFor="imagePicker"
            className="cursor-pointer bg-zinc-900 p-2 rounded-md"
          >
            Select Photos
          </label>
          <input
            type="file"
            name="imagePicker"
            id="imagePicker"
            hidden
            accept="image/*, video/*"
            onChange={handleImagePick}
          />
        </motion.div>
      )}
      {editCaption && !openC && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="dark:text-white flex w-screen relative lg:w-auto flex-col lg:h-auto h-dvh"
        >
          <div className="p-2 flex justify-between lg:static fixed gap-5 z-50 bottom-0">
            <button
              className="middle  none center rounded-lg bg-slate-800 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-slate-900/20 transition-all hover:shadow-lg hover:shadow-slate-900/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              onClick={() => {
                setEditCaption(false);
                setOpenC(true);
              }}
              disabled={!cropedImagesUrls.length}
            >
              Back
            </button>
            {isLoading ? (
              <button
                className="middle none center rounded-lg bg-slate-900 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-slate-900/20 transition-all hover:shadow-lg hover:shadow-slate-900/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
              >
                Uploading...
              </button>
            ) : (
              <button
                className="middle none center rounded-lg bg-slate-900 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-slate-900/20 transition-all hover:shadow-lg hover:shadow-slate-900/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
                onClick={handlePost}
                disabled={!cropedImagesUrls.length}
              >
                Post
              </button>
            )}
          </div>
          <div className="flex relative h-fit flex-col lg:flex-row">
            <div className="flex justify-center items-center lg:w-96 gap-5">
              <ImageSlider images={cropedImagesUrls} height="100%" />
            </div>
            <div className="lg:w-96 w-auto lg:h-80">
              <RichTextEditor value={caption} onChange={setCaption}
              className="bg-red-400 w-full h-full overflow-y-scroll scrollbar-none"
              />
              {/* <MultiLineInput
                text={caption}
                onChange={(e) => setCaption(e.target.value)}
                className={
                  "!ring-0 resize-none border outline-none border-none w-full h-full dark:bg-neutral-800 p-2 dark:text-gray-100"
                }
              /> */}
            </div>
          </div>
        </motion.div>
      )}

      {openC && (
        <ImageCropper
          cropedImagesUrls={cropedImagesUrls}
          setCropedImagesUrls={setCropedImagesUrls}
          imageData={imageData}
          image={selectedImage}
          onCrop={(file, imageUrl, allowNext) => {
            const setImage = () => {
              const image = imageData[file.name];
              if (image) {
                image.croppedImage = file;
                image.croppedImageUrl = imageUrl;
                setImageData((prev) => ({ ...prev, [file.name]: image }));
              }
            };
            if (allowNext) {
              setImage();
            } else {
              setImage();
              setCropedImagesUrls((prev) =>
                prev.filter((img) => img.name !== file.name)
              );
              setEditCaption(true);
              setOpenC(false);
            }
          }}
          onImagePick={handleImagePick}
          clearImage={(name) => {
            deleteAndSet(name);
            setCropedImagesUrls((prev) =>
              prev.filter((img) => img.name !== name)
            );
          }}
          selectImage={(name) => {
            const image = imageData[name];
            setSelectedImage(image);
          }}
          onResetAndClose={reset}
          aspectRatio={aspectRatio}
          setAspectRation={setAspectRation}
        />

        // <ImageCrop
        //   selectedImage={selectedImage}
        //   cropedImagesUrls={cropedImagesUrls}
        //   imageData={imageData}
        //   onCrop={(file, imageUrl, allowNext) => {
        //     console.log(imageUrl);
        //     const setImage = () => {
        //       const image = imageData[file.name];
        //       if (image) {
        //         image.croppedImage = file;
        //         image.croppedImageUrl = imageUrl;
        //         setImageData((prev) => ({ ...prev, [file.name]: image }));
        //       }
        //     };
        //     if (allowNext) {
        //       setImage();
        //     } else {
        //       setImage();
        //       setEditCaption(true);
        //       setCropedImagesUrls((prev) =>
        //         prev.filter((img) => img.name !== file.name)
        //       );
        //       setOpenC(false);
        //     }
        //   }}
        //   onImagePick={handleImagePick}
        //   onClose={(name) => {
        //     setOpenC(false);
        //   }}
        //   clearImage={(name) => {
        //     deleteAndSet(name);
        //     setCropedImagesUrls((prev) =>
        //       prev.filter((img) => img.name !== name)
        //     );
        //   }}
        // />
      )}
    </motion.div>
  );
};

export default CreatePost;
