import { useEffect, useState } from "react";
import { makeRequest } from "../../config/api.config";
import UploadImage from "./UploadImage";
import Input from "./Input";
import RadioGroup from "./RadioGroup";

const EditProfile = ({ user, onClose, setUser }) => {
  const [userData, setUserData] = useState({
    username: user?.username,
    name: user?.name,
    bio: user?.bio,
    gender: user?.gender,
    avatar: user?.avatar,
  });

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [uploadingProfile, setSetUploadingProfile] = useState(false);
  const [image, setImage] = useState(user?.avatar);

  useEffect(() => {
    ["username", "name", "bio", "gender"].forEach((field) => {
      if (userData[field] !== user[field]) {
        setSubmitDisabled(false);
      }
    });

    if (
      userData.username !== user?.username ||
      userData.name !== user?.name ||
      userData.bio !== user?.bio ||
      userData.gender !== user?.gender ||
      userData.avatar !== user?.avatar
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [userData, user]); //just

  const editProfile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      ["username", "name", "bio", "gender"].forEach((field) => {
        if (userData[field] !== user[field]) {
          formData.append(field, userData[field] || "");
        }
      });

      const result = await makeRequest.putForm("/user/edit", formData);
      setUser({ ...user, ...result.updatedData });
      setSubmitDisabled(true);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDataChange = (e) => {
    const name = e.target.name;
    const value = e.target?.value;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUploadAndRemove = async (avatar, removeProfilePicture) => {
    setSetUploadingProfile(true);
    if (removeProfilePicture) {
      const result = await makeRequest.delete("/profilePicture/remove");
      if (result.isSuccess) {
        setUser({ ...user, avatar: "", avatarSmall: "" });
        onClose();
        return;
      }
    }

    const formData = new FormData();
    formData.append("avatar", image ?? "");
    const result = await makeRequest.patchForm("/profilePicture", formData);
    setUser({ ...user, ...result.avatars });
    onClose();
  };

  return (
    <div className=" p-2 lg:rounded-lg rounded-lg lg:m-0 h-full border-2 bg-zinc-900 border-zinc-800 ">
      <div className="p-4">
        <h1 className="text-2xl font-semibold font-sans text-gray-50 text-center">
          Edit Profile
        </h1>
      </div>
      <div className="w-full h-full">
        <form onSubmit={editProfile} className="flex flex-col gap-2">
          <div>
            <UploadImage
              value={userData.avatar}
              onChange={handleDataChange}
              uploadMyProfilePicture={handleImageUploadAndRemove}
              setImage={setImage}
              image={image}
              name={"avatar"}
              loading={uploadingProfile}
            />
          </div>
          <Input
            name={"username"}
            value={userData.username}
            placeholder={"username"}
            onChange={handleDataChange}
            label="Username"
          />
          <Input
            name={"name"}
            value={userData.name}
            placeholder={"name"}
            onChange={handleDataChange}
            label="Name"
          />
          <Input
            name={"bio"}
            value={userData.bio}
            placeholder={"Bio"}
            onChange={handleDataChange}
            label="Bio"
            multiLine={true}
          />
          <RadioGroup
            values={["male", "female"]}
            selectedValue={userData.gender}
            onChange={handleDataChange}
            name="gender"
          />
          <div className="flex  gap-5">
            <button
              disabled={submitDisabled || uploadingProfile}
              type="submit"
              className="middle none center mr-3 rounded-lg bg-[#620C45] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-[#620C45]/20 transition-all hover:shadow-lg hover:shadow-[#620C45]/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
            >
              Submit
            </button>
            <button
              type="submit"
              className="middle none center mr-3 rounded-lg border border-[#620C45] py-3 px-6 font-sans text-xs font-bold uppercase text-[#620C45] transition-all hover:opacity-75 focus:ring focus:ring-pink-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
