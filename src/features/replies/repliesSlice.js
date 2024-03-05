import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllRepliesThunk } from "./repliesThunk";

const initialState = {
  isLoading: false,
  replies: [],
};
export const getAllReplies = createAsyncThunk(
  "replies/getAllReplies",
  getAllRepliesThunk
);
const repliesSlice = createSlice({
  name: "replies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReplies.pending, (state) => {
        return { ...state, isLoading: true };
      })
      .addCase(getAllReplies.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isLoading: false,
          replies: payload.replies,
        };
      })
      .addCase(getAllReplies.rejected, (state, { payload }) => {
        toast.warning(payload);
        return { ...state, isLoading: false };
      });
  },
});

export default repliesSlice.reducer;
