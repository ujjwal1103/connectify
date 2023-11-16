import React, { useState } from "react";
import avatar from "../../assets/man.png";
import { makeRequest } from "../../config/api.config";
import MultiLineInput from "../../common/InputFields/MultiLineInput";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../redux/services/postSlice";
import { resizeFile } from "../../services/postServices";
import { addPostToUser } from "../../redux/services/authSlice";
import EditImage from "./EditImage/EditImage";
import { ImageFill, OutlineClose, OutlineLoading3Quarters } from "../../icons";

const CreatePost = ({ setClose }) => {
  const [imageUrl, setImageUrl] = useState();
  const [caption, setCaption] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [newfile, setNewFile] = useState();
  const dispatch = useDispatch();

  const handleImagePick = async (e) => {
    setIsLoading(true);
    let file = e.target.files[0];
    file = await resizeFile(file, "file");
    setNewFile(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let dataURL = reader.result;
      setImageUrl(dataURL);
      setIsLoading(false);
    };
  };

  const handlePost = async () => {
    if (imageUrl) {
      const formData = new FormData();
      formData.append("imageUrl", newfile);
      formData.append("caption", caption || "");
      try {
        const { data } = await makeRequest.post("/post", formData);

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
                <OutlineLoading3Quarters />
              </div>
            ) : (
              <div className="flex flex-end gap-2">
                <button
                  class="middle none center rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  data-ripple-dark="true"
                  onClick={() => setEditImage(true)}
                  disabled={!imageUrl}
                >
                  Edit
                </button>
                <button
                  class="middle none center rounded-lg bg-slate-900 py-2 px-4 font-sans text-xs font-bold uppercase text-white shadow-md shadow-slate-900/20 transition-all hover:shadow-lg hover:shadow-slate-900/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  data-ripple-light="true"
                  onClick={handlePost}
                  disabled={!imageUrl}
                >
                  Post
                </button>
              </div>
            )}
          </div>

          <hr />

          <div className="flex flex-col h-full">
            <div className="p-2 m-2 border border-gray-800 rounded-lg flex items-start">
              <img
                src={user?.profilePicture || avatar}
                alt=""
                srcset=""
                width={40}
                className="rounded-full"
              />
              <MultiLineInput
                text={caption}
                setText={setCaption}
                className={
                  "!ring-0 resize-none outline-none border-none w-full dark:bg-transparent p-2 dark:text-gray-100"
                }
              />
              {/* <input type="text" placeholder='caption ' className='border-none !ring-0 mx-2 flex-1' value={caption} onChange={(e) => setCaption(e.target.value)} /> */}
              <div className="mx-2 hover:text-violet-950 flex justify-center items-center">
                <label htmlFor="postImage">
                  <ImageFill className="dark:text-gray-50" />
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
                        <OutlineLoading3Quarters
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
        <OutlineClose size={46} />
      </span>
      {editImage && <EditImage imageSrc={imageUrl} />}
    </div>
  );
};

export default CreatePost;
