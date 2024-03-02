import { toast } from "react-toastify";
import { customUrl } from "../../utils/axios";
import { clearState } from "./singleReplySlice";
import { getAllReplies } from "../replies/repliesSlice";

const createReplyThunk = async (body, thunkAPI) => {
  try {
    const resp = await customUrl.post(
      `/reviews/reply/new/${body.reviewId}`,
      body,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    thunkAPI.dispatch(getAllReplies(body.id));
    thunkAPI.dispatch(clearState());

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.msg);
  }
};
const editReplyThunk = async (body, thunkAPI) => {
  try {
    const { editId, comment, reviewId } = body;
    console.log(body);
    const resp = await customUrl.patch(
      `/reviews/reply/${editId}`,
      { comment },
      {
        withCredentials: true,
      }
    );
    thunkAPI.dispatch(getAllReplies(reviewId));
    thunkAPI.dispatch(clearState());

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.msg);
  }
};
const deleteReplyThunk = async ({ id, reviewId }, thunkAPI) => {
  try {
    const resp = await customUrl.delete(
      `/reviews/reply/${id}`,

      {
        withCredentials: true,
      }
    );
    thunkAPI.dispatch(getAllReplies(reviewId));
    thunkAPI.dispatch(clearState());

    toast.success(resp.data.msg);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.msg);
  }
};
export { deleteReplyThunk, editReplyThunk, createReplyThunk };
