import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import recipesReducer from "../features/recipes/recipesSlice";
import singleRecipeReducer from "../features/singleRecipe/singleRecipeSlice";
import reviewsReducer from "../features/reviews/reviewsSlice";
import singleReviewReducer from "../features/singleReview/singleReviewSlice";
import modalReducer from "../features/modal/modalSlice";
import repliesReducer from "../features/replies/repliesSlice";
import singleReplyReducer from "../features/singleReply/singleReplySlice";

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  user: userReducer,
  recipes: recipesReducer,
  reviews: reviewsReducer,
  singleRecipe: singleRecipeReducer,
  singleReview: singleReviewReducer,
  modal: modalReducer,
  replies: repliesReducer,
  singleReply: singleReplyReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
