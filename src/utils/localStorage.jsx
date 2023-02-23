const setToLocalStorage = (user) => {
  localStorage.setItem("Mama-Recipe-user", JSON.stringify(user));
};
const removeFromLocalStorage = () => {
  localStorage.removeItem("Mama-Recipe-user");
};

const getFromLocalStorage = () => {
  let recipeUser = localStorage.getItem("Mama-Recipe-user");
  const user = recipeUser ? JSON.parse(recipeUser) : null;
  return user;
};

export { setToLocalStorage, removeFromLocalStorage, getFromLocalStorage };
