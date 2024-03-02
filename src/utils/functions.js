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
export { checkUserPermission, checkUser };
