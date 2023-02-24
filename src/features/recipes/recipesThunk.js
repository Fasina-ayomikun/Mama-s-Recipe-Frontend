import { customUrl } from "../../utils/axios";
import { checkUserAuthorization } from "../../utils/functions";

const getAllRecipesThunk = async (_, thunkAPI) => {
  try {
    const resp = await customUrl.get("/recipes", {
      withCredentials: true,
     
    });
    return resp.data;
  } catch (error) {
    checkUserAuthorization(error, thunkAPI);
  }
};

export { getAllRecipesThunk };
