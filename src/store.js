import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import recipesReducer from "./features/recipes/recipesSlice";
import singleRecipeReducer from "./features/singleRecipe/singleRecipeSlice";
import reviewsReducer from "./features/reviews/reviewsSlice";
import singleReviewReducer from "./features/singleReview/singleReviewSlice";
import filesReducer from "./features/files/filesSlice";
import modalReducer from "./features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    recipes: recipesReducer,
    reviews: reviewsReducer,
    singleRecipe: singleRecipeReducer,
    singleReview: singleReviewReducer,
    files: filesReducer,
    modal: modalReducer,
  },
});
