import { toast } from "react-toastify";
import { customUrl } from "../../utils/axios";
import { getAllRecipes } from "../recipes/recipesSlice";
import { clearState, getSingleRecipe } from "./singleRecipeSlice";
import { initialQuery } from "../../utils/utils";

const getSingleRecipeThunk = async (id, thunkAPI) => {
  try {
    const resp = await customUrl.get(`/recipes/${id}`, {
      withCredentials: true,
    });
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.msg);
  }
};

const createRecipeThunk = async (body, thunkAPI) => {
  try {
    const resp = await customUrl.post("/recipes", body, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    thunkAPI.dispatch(clearState());
    thunkAPI.dispatch(getAllRecipes(initialQuery));
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.msg);
  }
};
const editRecipeThunk = async (body, thunkAPI) => {
  try {
    const { editId, formData } = body;
    const resp = await customUrl.patch(`/recipes/${editId}`, formData, {
      withCredentials: true,
    });
    thunkAPI.dispatch(clearState());
    thunkAPI.dispatch(getSingleRecipe(editId));
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.msg);
  }
};
const deleteRecipeThunk = async (id, thunkAPI) => {
  try {
    const resp = await customUrl.delete(
      `/recipes/${id}`,

      {
        withCredentials: true,
      }
    );
    thunkAPI.dispatch(getAllRecipes(initialQuery));

    toast.success(resp.data.msg);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.msg);
  }
};
export {
  deleteRecipeThunk,
  editRecipeThunk,
  getSingleRecipeThunk,
  createRecipeThunk,
};
