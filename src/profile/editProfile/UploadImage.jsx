import { useRef, useState } from "react";
import { resizeFile } from "../../services/postServices";
import ImageCrop from "../../shared/ImageCrop";
import { ImageFill } from "../../icons";
import { FaTrashCan } from "react-icons/fa6";
import Modal from "../../shared/Modal";
import { motion, AnimatePresence } from "framer-motion";
import { useClickOutside } from "@react-hookz/web";
import ProfilePicture from "../../common/ProfilePicture";

const UploadImage = ({
  value,
  onChange,
  setImage,
  name,
  image,
  uploadMyProfilePicture,
  loading,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [cropper, setCropper] = useState(false);

  const handleImagePick = async (e) => {
    let file = e.target.files[0];
    file = await resizeFile(file, "file");
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let dataURL = reader.result;
      onChange({ target: { value: dataURL, name: name } });
      setOpenModal(false);
      setImage(file);
      setCropper(true);
    };
  };

  const pickerRef = useRef(null);

  const handleRemoveProfilePicture = () => {
    setOpenModal(false);
    onChange({ target: { value: "", name: name } });
    uploadMyProfilePicture("", true);
    setImage("");
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      x: `-100%`,
      y: `-15%`,
    },
    visible: {
      opacity: 1,
      x: "0%",
      y: "-15%",
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 10,
        delay: 0.2,
      },
    },
    exit: {
      opacity: 0,
      x: `-100%`,
      y: `-15%`,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 10,
      },
    },
  };

  useClickOutside(pickerRef, () => {
    setOpenModal(false);
  });

  return (
    <div className="flex flex-col ">
      <div
        onClick={() => {
          !loading && setOpenModal(true);
        }}
        className="flex justify-center items-center relative "
      >
        <ProfilePicture
          src={value}
          className="w-20 h-20 rounded-full object-cover"
          alt=""
          loading={loading}
        />
        <AnimatePresence>
          {openModal && (
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit={"exit"}
              ref={pickerRef}
              className="p-2 absolute z-10 aspect-square dark:bg-zinc-950 top-0  right-0 dark:text-white rounded-md flex justify-center items-center flex-col gap-4 "
            >
              <label
                htmlFor="profilePic"
                className="flex justify-center items-center p-3 cursor-pointer  dark:bg-zinc-900 dark:hover:bg-zinc-950 rounded-full"
              >
                <ImageFill />
              </label>
              <button
                type="button"
                onClick={handleRemoveProfilePicture}
                className="flex justify-center items-center p-3 dark:bg-zinc-900 dark:hover:bg-zinc-950  rounded-full"
              >
                <FaTrashCan />
              </button>
              <input
                type="file"
                onChange={handleImagePick}
                hidden
                id="profilePic"
                accept="image/png, image/gif, image/jpeg"
              />
            </motion.div>
          )}
          {cropper && (
            <Modal
              onClose={() => {
                setCropper(false);
              }}
            >
              <ImageCrop
                image={value}
                name={image.name}
                onCrop={(file, imageUrl) => {
                  setImage(file);
                  onChange({ target: { value: imageUrl, name: name } });
                  uploadMyProfilePicture(imageUrl, false);
                  setOpenModal(false);
                  setCropper(false);
                }}
                onClose={() => {
                  setCropper(false);
                }}
                profile={true}
                scale={2}
                cropShape="round"
                aspect={4}
              />
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UploadImage;
