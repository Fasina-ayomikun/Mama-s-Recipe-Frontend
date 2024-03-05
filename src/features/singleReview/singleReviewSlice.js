import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createReviewThunk,
  deleteReviewThunk,
  editReviewThunk,
} from "./singleReviewThunk";

const initialState = {
  title: "",
  comment: "",
  ratings: "",
  createdAt: "",
  isLoading: false,
  isError: false,
  isEditing: false,
  reviewId: "",
};

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async (body, thunkAPI) => {
    return createReviewThunk(body, thunkAPI);
  }
);
export const editReview = createAsyncThunk(
  "reviews/editReview",
  async (body, thunkAPI) => {
    return editReviewThunk(body, thunkAPI);
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (body, thunkAPI) => {
    return deleteReviewThunk(body, thunkAPI);
  }
);
const singleReviewSlice = createSlice({
  name: "singleReview",
  initialState,
  reducers: {
    handleChange: (state, { payload }) => {
      let { name, value } = payload;

      state[name] = value;
    },

    setEditReview: (state, { payload }) => {
      return { ...state, reviewId: payload, isEditing: true };
    },
    setEditReviewDetails: (state, { payload }) => {
      const { title, comment, ratings } = payload;

      return { ...state, title, comment, ratings };
    },
    setRatings: (state, { payload }) => {
      state.ratings = payload;
    },
    clearState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createReview.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;

        toast.success(payload.msg);
      })
      .addCase(createReview.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;

        toast.warning(payload);
      })
      .addCase(editReview.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(editReview.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;

        toast.success(payload.msg);
      })
      .addCase(editReview.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isEditing = false;

        toast.warning(payload);
      });
  },
});
export const {
  setRatings,
  setEditReviewDetails,
  handleChange,
  clearState,
  setEditReview,
} = singleReviewSlice.actions;
export default singleReviewSlice.reducer;
