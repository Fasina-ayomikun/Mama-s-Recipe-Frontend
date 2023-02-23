import { toast } from "react-toastify";

export const handleError = (payload) => {
  if (typeof payload === Array) {
    payload.map((msg) => {
      toast.warning(msg);
    });
  } else {
    toast.warning(payload);
  }
};
