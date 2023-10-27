import React, { useState } from "react";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import avatar from "../../assets/man.png";
import { BsImageFill } from "react-icons/bs";
import { makeRequest } from "../../config/api.config";
import MultiLineInput from "../../common/InputFields/MultiLineInput";
import { useDispatch } from "react-redux";
import { addPost } from "../../redux/services/postSlice";

import { imageFileUpload } from "../../services/postServices";
import { addPostToUser } from "../../redux/services/authSlice";
import EditImage from "./EditImage/EditImage";

const CreatePost = ({ setClose }) => {
  const [imageUrl, setImageUrl] = useState();
  const [caption, setCaption] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [editImage, setEditImage] = useState(false);

  const dispatch = useDispatch();

  const handleImagePick = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let dataURL = reader.result;
      setImageUrl(dataURL);
    };
    const url = await imageFileUpload(file, "posts");
    if (url) {
      setImageUrl(url);
      setIsLoading(false);
    } else {
      alert("image not found");
    }
  };

  const handlePost = async () => {
    if (imageUrl) {
      const body = {
        imageUrl: imageUrl,
        caption: caption || "",
      };
      try {
        const { data } = await makeRequest.post("/post", body);

        if (data?.isSuccess) {
          dispatch(addPost(data.post));
          dispatch(addPostToUser(data.post._id));
          setClose();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please select an image");
    }
  };

  return (
    <div className="fixed lg:inset-0 bottom-0 left-0 bg-opacity-70 backdrop-blur-sm h-screen w-full bg-black   z-[1000]  flex justify-center items-center ">
      <div className="lg:w-1/3   bg-white rounded-2xl dark:bg-gray-600">
        <div className="h-[83%]">
          <div className="p-3 flex dark:text-gray-50  items-center justify-between">
            <h1>Create Post</h1>
            {loading ? (
              <div className="mx-3 text-violet-800  dark:text-gray-50 font-semibold animate-spin">
                <AiOutlineLoading3Quarters />
              </div>
            ) : (
             <>
              <button
                className="mx-3 text-violet-800 dark:text-gray-50 font-semibold"
                onClick={handlePost}
              >
                Post
              </button>
              <button
                className="mx-3 text-violet-800 dark:text-gray-50 font-semibold"
                onClick={()=>setEditImage(true)}
              >
               Edit
              </button>
             </>
            )}
          </div>

          <hr />

          <div className="flex flex-col h-full">
            <div className="p-2 m-2 border border-gray-800 rounded-lg flex items-start">
              <img src={avatar} alt="" srcset="" width={40} />
              <MultiLineInput
                text={caption}
                setText={setCaption}
                className="dark:bg-transparent"
              />
              {/* <input type="text" placeholder='caption ' className='border-none !ring-0 mx-2 flex-1' value={caption} onChange={(e) => setCaption(e.target.value)} /> */}
              <div className="mx-2 hover:text-violet-950 flex justify-center items-center">
                <label htmlFor="postImage">
                  {" "}
                  <BsImageFill className="dark:text-gray-50" />
                </label>
                <input
                  type="file"
                  name=""
                  id="postImage"
                  hidden
                  accept="image/png, image/gif, image/jpeg"
                  onChange={handleImagePick}
                  className="dark:bg-transparent"
                />
              </div>
            </div>
            <div className=" h-full p-2 m-2 flex flex-col justify-center items-center transition-transform duration-300">
              {!imageUrl ? (
                <div className="border-2 border-dashed border-gray-500 rounded-xl p-8 text-center dark:text-gray-50">
                  Drag and Drop Images here
                </div>
              ) : (
                <div className="w-full h-full relative">
                  <img
                    src={imageUrl}
                    className="w-full h-full max-h-[400px] rounded-lg"
                    alt="hiii"
                  />
                  {loading && (
                    <div className="absolute top-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 rounded-lg">
                      <div className="mx-3 text-violet-100 font-semibold ">
                        <AiOutlineLoading3Quarters
                          className="animate-spin"
                          size={23}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <span
        className="absolute right-10 top-10 text-white cursor-pointer"
        onClick={setClose}
      >
        <AiOutlineClose size={46} />
      </span>
     {editImage && <EditImage imageSrc={imageUrl}/>}
    </div>
  );
};

export default CreatePost;
