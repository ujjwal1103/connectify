import { useEffect, useState } from "react";
import { makeRequest } from "../../config/api.config";
import MultiLineInput from "./../../common/InputFields/MultiLineInput";
import UploadImage from "./UploadImage";
import Input from "./Input";
import RadioGroup from "./RadioGroup";

const EditProfile = ({ user, setClose, setUser }) => {
  const [username, setUsername] = useState(user?.username);
  const [name, setName] = useState(user?.name);
  const [bio, setBio] = useState(user?.bio);
  const [gender, setGender] = useState(user?.gender);
  const [profilePic, setProfilePic] = useState(user?.profilePicture);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    if (
      username !== user?.username ||
      name !== user?.name ||
      bio !== user?.bio ||
      gender !== user?.gender ||
      profilePic !== user?.profilePicture
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [
    username,
    name,
    bio,
    gender,
    profilePic,
    user?.username,
    user?.name,
    user?.bio,
    user?.gender,
    user?.profilePicture,
  ]);

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
    <div className="w-full h-screen fixed inset-0 dark:bg-gray-900 bg-gray-50 overflow-hidden flex justify-center items-center ">
      <div className=" p-2 lg:rounded-lg lg:w-1/4 mb-20 lg:m-0">
        <div className="p-4">
          <h1 className="text-2xl font-semibold font-sans text-gray-50 text-center">
            Edit Profile
          </h1>
        </div>
        <div className="w-full">
          <form onSubmit={editProfile} className="flex flex-col gap-5">
            <div>
              <UploadImage
                profilePic={profilePic}
                setProfilePic={setProfilePic}
              />
            </div>
            <Input
              value={username}
              placeholder={"username"}
              setState={setUsername}
              label="Username"
            />
            <Input
              value={name}
              placeholder={"name"}
              setState={setName}
              label="Name"
            />
            <div className="relative h-11 w-full min-w-[200px]">
              <MultiLineInput
                type="text"
                onChange={(e) => setBio(e.target.value)}
                className="peer resize-none h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                value={bio}
                setText={setBio}
              />
              <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Bio
              </label>
            </div>
            <RadioGroup
              values={["male", "female"]}
              selectedValue={gender}
              setState={setGender}
              name="gender"
            />
            <div className="flex  gap-5">
              <button
                disabled={submitDisabled}
                type="submit"
                class="middle none center mr-3 rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
              >
                Submit
              </button>
              <button
                type="submit"
                class="middle none center mr-3 rounded-lg border border-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:opacity-75 focus:ring focus:ring-pink-200 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
                onClick={setClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
