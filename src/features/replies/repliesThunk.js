import { customUrl } from "../../utils/axios";

const getAllRepliesThunk = async (id, thunkAPI) => {
  try {
    const resp = await customUrl.get(`/reviews/reply/all/${id}`, {
      withCredentials: true,
    });
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.msg);
  }
};
export { getAllRepliesThunk };
