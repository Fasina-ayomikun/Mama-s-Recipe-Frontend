import { toast } from "react-toastify";
import { customUrl } from "./axios";
import { getFromLocalStorage } from "./localStorage";
import { getSingleRecipe } from "../features/singleRecipe/singleRecipeSlice";

const user = getFromLocalStorage();

const checkUser = (itemUser) => {
  if (user?.email === itemUser?.email) {
    return "You";
  } else {
    return itemUser?.firstName;
  }
};
const checkUserPermission = (referenceEmail) => {
  if (referenceEmail && user) {
    return user.email === referenceEmail;
  }
  return;
};

const getUniqueValues = async (setSelectList) => {
  try {
    const values = await customUrl.get("/recipes/details", {
      withCredentials: true,
    });
    setSelectList(values.data);
  } catch (error) {
    console.log(error);
  }
};
const checkOutPayment = async (amount) => {
  try {
    const resp = await customUrl.post(
      "/payment/checkout",
      { amount },
      {
        withCredentials: true,
      }
    );
    if (resp.status === 200) {
      window.location.assign(resp.data.url);
    }
  } catch (error) {
    console.log(error);
  }
};
const toggleLike = async (id, setIsSubmitting, dispatch) => {
  setIsSubmitting(true);
  try {
    const resp = await customUrl.get(`/recipes/like/${id}`, {
      withCredentials: true,
    });
    console.log(resp);
    if (resp?.status === 200) {
      dispatch(getSingleRecipe(id));
    }
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      toast.warning("Please log in");
    } else {
      toast.warning(error.response.data.error.msg);
    }
  } finally {
    setIsSubmitting(false);
  }
};
export {
  checkUserPermission,
  checkUser,
  getUniqueValues,
  checkOutPayment,
  toggleLike,
};
