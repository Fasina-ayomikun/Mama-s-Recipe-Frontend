import { toast } from "react-toastify";
import { customUrl } from "../../utils/axios";
import { checkUserAuthorization } from "../../utils/functions";
import { clearImageState } from "../files/filesSlice";
import { getAllRecipes } from "../recipes/recipesSlice";
import { clearState } from "./singleRecipeSlice";

const getSingleRecipeThunk = async (id, thunkAPI) => {
  try {
    const resp = await customUrl.get(`/recipes/${id}`, {
      withCredentials: true,
    });
    return resp.data;
  } catch (error) {
    return checkUserAuthorization(error, thunkAPI);
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
    thunkAPI.dispatch(clearImageState());
    return resp.data;
  } catch (error) {
    return checkUserAuthorization(error, thunkAPI);
  }
};
const editRecipeThunk = async (body, thunkAPI) => {
  try {
    const { editId, formData } = body;
    const resp = await customUrl.patch(`/recipes/${editId}`, formData, {
      withCredentials: true,
    });
    thunkAPI.dispatch(clearState());

    thunkAPI.dispatch(clearImageState());
    return resp.data;
  } catch (error) {
    return checkUserAuthorization(error, thunkAPI);
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
    thunkAPI.dispatch(getAllRecipes());

    toast.success(resp.data.msg);
    return resp.data;
  } catch (error) {
    return checkUserAuthorization(error, thunkAPI);
  }
};
export {
  deleteRecipeThunk,
  editRecipeThunk,
  getSingleRecipeThunk,
  createRecipeThunk,
};
