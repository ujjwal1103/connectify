import React, { useState } from "react";
import imageIcon from "../../assets/gallery.png";
import MultiLineInput from "../../common/InputFields/MultiLineInput";
import { makeRequest } from "../../config/api.config";

import { motion } from "framer-motion";
import { EmojiSmile } from "../../icons";
import ImageCrop from "../../shared/ImageCrop";
import { useDispatch } from "react-redux";
import { addPost } from "../../redux/services/postSlice";
import { useLocation } from "react-router-dom";

const CreatePost = ({ onClose }) => {
  const [imageUrl, setImageUrl] = useState();
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newFile, setNewFile] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [openC, setOpenC] = useState(false);
  const [editCaption, setEditCaption] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const handleImagePick = async (e) => {
    setIsLoading(true);
    let file = e.target.files[0];
    setSelectedFile(file);
    const dataURL = await readFileAsDataURL(file);
    setImageUrl(dataURL);
    setIsLoading(false);
    setOpenC(true);
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handlePost = async () => {
    if (!imageUrl) {
      alert("Please select an image");
    }
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("postImage", newFile);
      formData.append("caption", caption || "");
      const data = await makeRequest.post("/post", formData);
      if (data?.isSuccess) {
        location.pathname === "/profile" && dispatch(addPost(data.post));
        onClose();
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
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
          className="text-white justify-center min-w-[24rem]  min-h-[24rem] max-h-[24rem] h-[24rem] items-center  flex flex-col gap-4 "
        >
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
            onChange={handleImagePick}
          />
        </motion.div>
      )}
      {editCaption && !openC && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="dark:text-white flex w-auto flex-col "
        >
          <div className="p-2 flex justify-between">
            <button
              className="middle none center rounded-lg bg-slate-800 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-slate-900/20 transition-all hover:shadow-lg hover:shadow-slate-900/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              onClick={() => {
                setEditCaption(false);
                setOpenC(true);
              }}
              disabled={!imageUrl}
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
                disabled={!imageUrl}
              >
                Post
              </button>
            )}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="flex relative h-fit"
          >
            <div className="flex justify-center items-center  gap-5">
              <img src={imageUrl} className="h-80  object-contain " alt="imagess"/>
            </div>
            <div className="w-96 h-80">
              <MultiLineInput
                text={caption}
                setText={setCaption}
                className={
                  "!ring-0 resize-none border outline-none border-none w-full h-full dark:bg-neutral-800 p-2 dark:text-gray-100"
                }
              />
              <div className="absolute flex justify-center items-center bottom-2 right-2 z-10">
                <button
                  className=" bg-slate-950 justify-center items-center flex w-10 h-10 rounded-full "
                  // onClick={() => setShowEmojiPicker(true)}
                >
                  <EmojiSmile size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {openC && (
        <ImageCrop
          image={imageUrl}
          name={selectedFile.name}
          onCrop={(file, imageUrl) => {
            setImageUrl(imageUrl);
            setNewFile(file);
            setEditCaption(true);
            setOpenC(false);
          }}
          onClose={() => setOpenC(false)}
        />
      )}
    </motion.div>
  );
};

export default CreatePost;
