import { customUrl } from "../../utils/axios";
import { checkUserAuthorization } from "../../utils/functions";

const getAllRecipesThunk = async (_, thunkAPI) => {
  try {
    const resp = await customUrl.get("/recipes", {
      withCredentials: true,
       headers:{
      'Access-Control-Allow-Origin': process.env.REACT_APP_SERVER_URL
      }
 
    });
    return resp.data;
  } catch (error) {
    checkUserAuthorization(error, thunkAPI);
  }
};

export { getAllRecipesThunk };
