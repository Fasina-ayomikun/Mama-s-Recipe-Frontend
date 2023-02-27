import { customUrl } from "../../utils/axios";
import axios from "axios";
import { checkUserAuthorization } from "../../utils/functions";

const imageThunk = async (url, file, thunkAPI) => {
  try {
    const resp = await customUrl.post(url, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    console.log(resp.data)
    return resp.data;
  } catch (error) {
    console.log(error.response,error)
    return checkUserAuthorization(error, thunkAPI);
  }
};

export { imageThunk };
