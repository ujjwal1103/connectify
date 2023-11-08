import avatar from "../../assets/man.png";
import { useState } from "react";
import { OutlineLoading3Quarters } from "../../icons";
import { resizeFile } from "../../services/postServices";

const UploadImage = ({ setProfilePic, profilePic }) => {
  const [loading, setIsLoading] = useState(false);

  const handleImagePick = async (e) => {
    setIsLoading(true);
    let file = e.target.files[0];
    file = await resizeFile(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let dataURL = reader.result;
      setProfilePic(dataURL);
      setIsLoading(false);
    };
  };
  return (
    <div className="flex flex-col ">
      {loading ? (
        <label
          htmlFor="profilePic"
          className="flex justify-center items-center relative overflow-clip"
        >
          <img
            src={profilePic || avatar}
            className="w-20 h-20 rounded-full object-cover"
            alt=""
          />
          <div className="absolute top-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 rounded-lg">
            <div className="mx-3 text-violet-100 font-semibold ">
              <OutlineLoading3Quarters className="animate-spin" size={23} />
            </div>
          </div>
        </label>
      ) : (
        <label
          htmlFor="profilePic"
          className="flex justify-center items-center"
        >
          <img
            src={profilePic || avatar}
            className="w-20 h-20 rounded-full object-cover"
            alt=""
          />
        </label>
      )}
      <input
        type="file"
        onChange={handleImagePick}
        hidden
        id="profilePic"
        accept="image/png, image/gif, image/jpeg"
      />
    </div>
  );
};

export default UploadImage;
