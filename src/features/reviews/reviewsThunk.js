import { customUrl } from "../../utils/axios";
import { checkUserAuthorization } from "../../utils/functions";

const getRecipeReviewThunk = async (id, thunkAPI) => {
  try {
    const resp = await customUrl.get(`/reviews/${id}`, {
      withCredentials: true,
    });
    return resp.data;
  } catch (error) {
    return checkUserAuthorization(error, thunkAPI);
  }
};

export { getRecipeReviewThunk };
