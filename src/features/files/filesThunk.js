import { customUrl } from "../../utils/axios";
import axios from "axios";
import { checkUserAuthorization } from "../../utils/functions";

const imageThunk = async (url, file, thunkAPI) => {
  try {
   const resp = await axios.post('https://nutty-bass-nightshirt.cyclic.app/files/upload/image', file, {
  headers: {
    "Content-Type": "multipart/form-data",
    'Access-Control-Allow-Origin': 'https://nutty-bass-nightshirt.cyclic.app/files/upload/image'
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
