import { toast, Zoom } from "react-toastify";
import Swal from "sweetalert2";

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

  const confirmModal = async (alertInfo) => {
    const result = await Swal.fire({
      ...alertInfo,
      background: "black",
    });
    return result;
  };

  return { alert, confirmModal };
};

export default useAleart;
