import { customUrl } from "../../utils/axios";

const getAllRecipesThunk = async (query, thunkAPI) => {
  try {
    const resp = await customUrl.get(
      `/recipes?search=${query.search}&page=${query.page}&equipment=${query.equipment}&ingredient=${query.ingredient}&minLikes=${query.minLikes}&minReviews=${query.minReviews}&creator=${query.creator}&sort=${query.sort}`,
      {
        withCredentials: true,
      }
    );
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.msg);
  }
};

const getSingleUserRecipeThunk = async ({ id, page }, thunkAPI) => {
  try {
    const resp = await customUrl.get(`/recipes/user/${id}?page=${page}`, {
      withCredentials: true,
    });
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.msg);
  }
};

const getUserFavoriteRecipeThunk = async (id, thunkAPI) => {
  try {
    const resp = await customUrl.get(`/recipes/favorite/${id}`, {
      withCredentials: true,
    });
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.msg);
  }
};

export {
  getAllRecipesThunk,
  getSingleUserRecipeThunk,
  getUserFavoriteRecipeThunk,
};
