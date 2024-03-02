import { toast } from "react-toastify";

export const handleError = (payload) => {
  console.log(payload);
  if (typeof payload === Array) {
    payload.map((msg) => {
      toast.warning(msg);
    });
  } else {
    toast.warning(payload);
  }
};
