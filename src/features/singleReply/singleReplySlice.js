import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createReplyThunk,
  deleteReplyThunk,
  editReplyThunk,
} from "./singleReplyThunk";
const initialState = {
  replyId: "",
  comment: "",
  isLoading: false,
  isEditing: false,
};
export const createReply = createAsyncThunk(
  "reply/createReply",
  async (body, thunkAPI) => {
    return createReplyThunk(body, thunkAPI);
  }
);
export const editReply = createAsyncThunk(
  "reply/editReply",
  async (body, thunkAPI) => {
    return editReplyThunk(body, thunkAPI);
  }
);

export const deleteReply = createAsyncThunk(
  "reply/deleteReply",
  async (id, thunkAPI) => {
    return deleteReplyThunk(id, thunkAPI);
  }
);
const singleReplySlice = createSlice({
  name: "singleReply",
  initialState,
  reducers: {
    handleChange: (state, { payload }) => {
      const { name, value } = payload;
      console.log(payload);
      return { ...state, [name]: value };
    },
    clearState: () => {
      return initialState;
    },
    setEditReply: (state, { payload }) => {
      return { ...state, replyId: payload, isEditing: true };
    },
    setEditReplyDetails: (state, { payload }) => {
      const { comment } = payload;

      return { ...state, comment };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReply.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createReply.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;

        toast.success(payload.msg);
      })
      .addCase(createReply.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        toast.warning(payload);
      })
      .addCase(editReply.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isEditing = false;
      })
      .addCase(editReply.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;

        toast.success(payload.msg);
      })
      .addCase(editReply.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isEditing = false;
        toast.warning(payload);
      });
  },
});
export const { handleChange, clearState, setEditReply, setEditReplyDetails } =
  singleReplySlice.actions;
export default singleReplySlice.reducer;
