import { toast, Zoom } from "react-toastify";

const toastOption = {
  position: "bottom-left",
  autoClose: 500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  progress: undefined,
  transition: Zoom,
};

const useAleart = () => {
  const alert = (message, options) => {
    toast.success(message, { ...toastOption, ...options });
  };

  return {alert};
};

export default useAleart;
