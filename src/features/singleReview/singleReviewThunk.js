import { toast } from "react-toastify";
import { customUrl } from "../../utils/axios";
import { getRecipeReviews } from "../reviews/reviewsSlice";
import { getSingleRecipe } from "../singleRecipe/singleRecipeSlice";
import { clearState } from "./singleReviewSlice";

const createReviewThunk = async (body, thunkAPI) => {
  try {
    const resp = await customUrl.post("/reviews", body, {
      withCredentials: true,
    });
    thunkAPI.dispatch(getRecipeReviews(resp.data.review.recipe));
    thunkAPI.dispatch(getSingleRecipe(resp.data.review.recipe));
    thunkAPI.dispatch(clearState());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.msg);
  }
};
const editReviewThunk = async (body, thunkAPI) => {
  try {
    const { reviewId, title, comment, ratings, recipe } = body;
    console.log(reviewId, title);
    const resp = await customUrl.patch(
      `/reviews/${reviewId}`,
      { title, comment, recipe, ratings },
      {
        withCredentials: true,
      }
    );

    thunkAPI.dispatch(getRecipeReviews(recipe));
    thunkAPI.dispatch(getSingleRecipe(recipe));
    thunkAPI.dispatch(clearState());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.msg);
  }
};
const deleteReviewThunk = async (body, thunkAPI) => {
  try {
    const { reviewId, recipeId } = body;
    const resp = await customUrl.delete(
      `/reviews/${reviewId}`,

      {
        withCredentials: true,
      }
    );

    toast.success(resp.data.msg);
    thunkAPI.dispatch(getRecipeReviews(recipeId));
    thunkAPI.dispatch(getSingleRecipe(recipeId));
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.msg);
  }
};
export { deleteReviewThunk, editReviewThunk, createReviewThunk };
