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
    console.log(resp.data);

<<<<<<< HEAD
=======
 const resp = await axios.post(`${process.env.REACT_APP_SERVER_URL}${url}, file, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});
    console.log(resp.data)
    
>>>>>>> 7fa346a810db9ad94d214be498b9c94c61729234
    return resp.data;
  } catch (error) {
    console.log(error.response, error);
    return checkUserAuthorization(error, thunkAPI);
  }
};

export { imageThunk };
