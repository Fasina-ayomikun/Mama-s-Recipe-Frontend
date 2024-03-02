import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getRecipeReviewThunk } from "./reviewsThunk";

const initialState = {
  isLoading: true,

  isError: false,
  reviews: [],
};

export const getRecipeReviews = createAsyncThunk(
  "reviews/getRecipeReviews",
  async (id, thunkAPI) => {
    return getRecipeReviewThunk(id, thunkAPI);
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecipeReviews.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getRecipeReviews.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.reviews = payload.reviews;
      })
      .addCase(getRecipeReviews.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;

        toast.warning(payload);
      });
  },
});

export default reviewsSlice.reducer;
