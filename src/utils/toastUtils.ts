import { toast, ToastOptions } from "react-toastify";

const toastProps: ToastOptions = {
  position: "top-right",
  autoClose: 2000,
  closeOnClick: true,
  pauseOnHover: true,
  style: {
    top: "35px",
  },
};

export const toastSuccess = (message = "Success") => {
  toast.success(message, toastProps);
};

export const toastError = (message = "Failed") => {
  toast.error(message, toastProps);
};
