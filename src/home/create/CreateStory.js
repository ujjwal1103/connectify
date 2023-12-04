import React, { useState } from "react";
import { makeRequest } from "../../config/api.config";
import { ImageFill, OutlineClose, OutlineLoading3Quarters } from "../../icons";

const CreateStory = ({ setClose }) => {
  const [imageUrl, setImageUrl] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState();

  const handleImagePick = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    setFile(e.target.files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let dataURL = reader.result;
      setImageUrl(dataURL);
    };
    setIsLoading(false);
  };

  const handlePost = async () => {
    const data = new FormData();
    data.append("story", file);

    console.log(data);
    if (data) {
      try {
        const res = await makeRequest.post("/story", data);

        if (res?.isSuccess) {
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
    <div className="z-50 fixed h-screen w-full bg-black bg-opacity-90 backdrop-blur-md top-0 left-0 flex justify-center items-center ">
      <div className="w-1/3  bg-white rounded-2xl">
        <div className="h-[83%]">
          <div className="p-3 flex  items-center justify-between">
            <h1>Create Story</h1>
            {isLoading ? (
              <div className="mx-3 text-violet-800 font-semibold animate-spin">
                <OutlineLoading3Quarters />
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
                  <ImageFill />
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
                {isLoading && (
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
            </div>
          </div>
        </div>
      </div>
      <button
        className="absolute right-10 top-10 text-white cursor-pointer"
        onClick={setClose}
      >
        <OutlineClose size={46} />
      </button>
    </div>
  );
};

export default CreateStory;
