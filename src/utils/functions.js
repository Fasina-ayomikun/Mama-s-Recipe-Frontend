import { customUrl } from "./axios";
import { getFromLocalStorage } from "./localStorage";

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
export { checkUserPermission, checkUser, getUniqueValues };
