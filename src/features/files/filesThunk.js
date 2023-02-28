import { customUrl } from "../../utils/axios";
import axios from "axios";
import { checkUserAuthorization } from "../../utils/functions";

const imageThunk = async (url, file, thunkAPI) => {
  try {
    const resp = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}${url}`,
      file,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return resp.data;
  } catch (error) {
    return checkUserAuthorization(error, thunkAPI);
  }
};

export { imageThunk };
