import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
import { imageThunk } from "./filesThunk";

const initialState = {
  isLoading: false,
  isError: false,
  image: "",
};

export const uploadImage = createAsyncThunk(
  "files/uploadImage",
  async (file, thunkAPI) => {
    return imageThunk("/files/upload/image", file, thunkAPI);
  }
);

export const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    clearImageState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(uploadImage.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(uploadImage.fulfilled, (state, { payload }) => {
     
        state.isLoading = false;
        state.isError = false;
        state.image = payload.image;
      })
      .addCase(uploadImage.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        handleError(payload);
      });
  },
});
export const { clearImageState } = filesSlice.actions;
export default filesSlice.reducer;
