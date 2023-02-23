import { customUrl } from "../../utils/axios";
import { checkUserAuthorization } from "../../utils/functions";

const imageThunk = async (url, file, thunkAPI) => {
  try {
    const resp = await customUrl.post(url, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return resp.data;
  } catch (error) {
    return checkUserAuthorization(error, thunkAPI);
  }
};
const videoThunk = async (url, file, thunkAPI) => {
  try {
    const resp = await customUrl.post(url, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return resp.data;
  } catch (error) {
    return checkUserAuthorization(error, thunkAPI);
  }
};
export { imageThunk, videoThunk };
