import { customUrl } from "../../utils/axios";

const getRecipeReviewThunk = async (id, thunkAPI) => {
  try {
    const resp = await customUrl.get(`/reviews/all/${id}`, {
      withCredentials: true,
    });
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.msg);
  }
};

export { getRecipeReviewThunk };
