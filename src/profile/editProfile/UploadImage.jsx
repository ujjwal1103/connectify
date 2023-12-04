import avatar from "../../assets/man.png";
import { useState } from "react";
import { resizeFile } from "../../services/postServices";

const UploadImage = ({ setProfilePic, profilePic, setImage }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleImagePick = async (e) => {
    let file = e.target.files[0];
    file = await resizeFile(file, "file");
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let dataURL = reader.result;
      setProfilePic(dataURL);
      setImage(file);

      setOpenModal(false);
    };
  };

  const handleRemoveProfilePicture = () => {
    setProfilePic("");
    setImage("");

    setOpenModal(false);
  };

  return (
    <div className="flex flex-col ">
      <div
        onClick={() => setOpenModal(true)}
        className="flex justify-center items-center"
      >
        <img
          src={profilePic || avatar}
          className="w-20 h-20 rounded-full object-cover"
          alt=""
        />
      </div>

      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
          <div className="w-96 h-96 bg-slate-800 rounded-md flex justify-center items-center flex-col gap-4 ">
            <label
              htmlFor="profilePic"
              className="flex justify-center items-center py-2 px-3 bg-slate-950 rounded-lg cursor-pointer"
            >
              Select New Profile Picture
            </label>
            <button
              type="button"
              onClick={handleRemoveProfilePicture}
              className="flex justify-center items-center py-2 px-3 bg-slate-950 rounded-lg"
            >
              Remove profile picture
            </button>
            <input
              type="file"
              onChange={handleImagePick}
              hidden
              id="profilePic"
              accept="image/png, image/gif, image/jpeg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
