import { customUrl } from "../../utils/axios";

const getAllRepliesThunk = async (id, thunkAPI) => {
  try {
    const resp = await customUrl.get(`/reviews/reply/all/${id}`, {
      withCredentials: true,
    });
    console.log(resp);
    return resp.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data.error.msg);
  }
};
export { getAllRepliesThunk };
