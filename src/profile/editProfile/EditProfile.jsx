import { useState } from "react";
import { makeRequest } from "../../config/api.config";
import MultiLineInput from "./../../common/InputFields/MultiLineInput";
import UploadImage from "./UploadImage";

const EditProfile = ({ user, setClose, setUser }) => {
  const [username, setUsername] = useState(user?.username);
  const [name, setName] = useState(user?.name);
  const [bio, setBio] = useState(user?.bio);
  const [gender, setGender] = useState(user?.gender);
  const [profilePic, setProfilePic] = useState(user?.profilePicture);

  const editProfile = async (e) => {
    e.preventDefault();
    const user = {
      username,
      name,
      bio,
      gender,
      profilePicture: profilePic,
    };
    const result = await makeRequest.put("/user/edit", user);
    setUser(result.user);
    setClose();
  };

  return (
    <div className="w-full h-screen absolute inset-0 bg-gray-300 overflow-hidden flex justify-center items-center">
      <div className="">
        <div className="p-4">
          <h1 className="text-2xl font-semibold font-sans text-violet-950 text-center">
            Edit Profile
          </h1>
        </div>
        <div className="">
          <form onSubmit={editProfile} className="flex flex-col gap-5 ">
            <div>
                <UploadImage profilePic={profilePic} setProfilePic={setProfilePic}/>
            </div>
            <div className="flex flex-col">
              <label>Username</label>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                className="!ring-0"
                value={username}
              />
            </div>
            <div className="flex flex-col">
              <label>Name</label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="!ring-0"
                value={name}
              />
            </div>
            <div className="flex flex-col">
              <label>Bio</label>
              <MultiLineInput
                type="text"
                onChange={(e) => setBio(e.target.value)}
                className="resize-none !ring-0"
                value={bio}
                setText={setBio}
              />
            </div>
            <div className="flex flex-col">
              <label>Gender</label>
              <div className="flex gap-3 items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </div>
            </div>
           
            <div className="flex  gap-5">
              <button type="submit">Submit</button>
              <button type="button" onClick={setClose}>
                cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
