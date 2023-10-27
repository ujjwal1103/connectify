import React, { useState } from "react";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import avatar from "../../assets/man.png";
import { BsImageFill } from "react-icons/bs";
import { storage } from "../../config/firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { makeRequest } from "../../config/api.config";

const CreateStory = ({ setClose }) => {
  const [imageUrl, setImageUrl] = useState();
  const [loading, setIsLoading] = useState(false);

  const handleImagePick = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let dataURL = reader.result;
      setImageUrl(dataURL);
    };

    const fileRef = ref(storage, `images/${file.name}`);
    const res = await uploadBytes(fileRef, file);

    if (res) {
      const url = await getDownloadURL(fileRef);
      setImageUrl(url);
      setIsLoading(false);
    }
  };

  const handlePost = async () => {
    if (imageUrl) {
      const body = {
        content: imageUrl,
      };
      try {
        const { data } = await makeRequest.post("/story", body);

        if (data?.isSuccess) {
          setClose();
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("please select image");
    }
  };

  return (
    <div className="fixed h-screen w-full bg-black bg-opacity-70  inset-0 flex justify-center items-center ">
      <div className="w-1/3   bg-white rounded-2xl">
        <div className="h-[83%]">
          <div className="p-3 flex  items-center justify-between">
            <h1>Create Story</h1>
            {loading ? (
              <div className="mx-3 text-violet-800 font-semibold animate-spin">
                <AiOutlineLoading3Quarters />
              </div>
            ) : (
              <button
                className="mx-3 text-violet-800 font-semibold"
                onClick={handlePost}
              >
                Post
              </button>
            )}
          </div>

          <hr />

          <div className="flex flex-col h-full">
            <div className="p-2 m-2 border border-gray-800 rounded-lg w-fit ">
              <div className="mx-2 w-fit hover:text-violet-950 ">
                <label
                  htmlFor="postImage"
                  className="flex justify-center items-center text-center"
                >
                  <BsImageFill />
                </label>
                <input
                  type="file"
                  name=""
                  id="postImage"
                  hidden
                  accept="image/png, image/gif, image/jpeg"
                  onChange={handleImagePick}
                />
              </div>
            </div>
            <div className=" h-full p-2 m-2 flex flex-col justify-center items-center transition-transform duration-300">
              <div className="w-full h-full relative">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    className="w-full h-full max-h-[400px] rounded-lg"
                    alt="iii"
                  />
                )}
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
    </div>
  );
};

export default CreateStory;
