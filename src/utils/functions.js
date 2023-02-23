import { logoutUser } from "../features/users/userSlice";
import { getFromLocalStorage } from "./localStorage";

const getIngredients = (recipes) => {
  const ingredientsArray = recipes.map((recipe) => {
    return recipe.ingredients;
  });
  let ingredients = ingredientsArray.reduce((total, arr) => {
    return [...total, ...arr];
  }, []);
  ingredients = Array.from(new Set(ingredients));
  return ingredients;
};
const getEquipments = (recipes) => {
  const equipmentsArray = recipes.map((recipe) => {
    return recipe.equipments;
  });
  let equipments = equipmentsArray.reduce((total, arr) => {
    return [...total, ...arr];
  }, []);
  equipments = Array.from(new Set(equipments));

  return equipments;
};
const user = getFromLocalStorage();

const checkUser = (itemUser) => {
  if (user?.email === itemUser?.email) {
    return "You";
  } else {
    return itemUser?.firstName;
  }
};
const popularRecipes = (recipes) => {
  return [...recipes].sort((a, b) => {
    return b.averageRatings - a.averageRatings;
  });
};
const profileRecipes = (recipes, id) => {
  return recipes.filter((recipe) => recipe?.user?._id === id);
};
const checkUserPermission = (referenceEmail) => {
  if (referenceEmail && user) {
    return user.email === referenceEmail;
  }
  return;
};
const checkUserAuthorization = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(logoutUser());
    return thunkAPI.rejectWithValue("Unauthorized Access,Logging Out...");
  } else {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export {
  checkUserPermission,
  getIngredients,
  checkUserAuthorization,
  getEquipments,
  popularRecipes,
  profileRecipes,
  checkUser,
};
