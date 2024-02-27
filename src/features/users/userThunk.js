import { customUrl } from "../../utils/axios";
import { setToLocalStorage } from "../../utils/localStorage";
import { clearImageState } from "../files/filesSlice";
const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customUrl.post(url, user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    console.log(resp);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customUrl.post(url, user, {
      withCredentials: true,
    });
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
const logoutUserThunk = async (url, thunkAPI) => {
  try {
    const resp = await customUrl.get(url, {
      withCredentials: true,
    });

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
const editUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customUrl.patch(url, user, {
      withCredentials: true,
    });

    thunkAPI.dispatch(clearImageState());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
const singleUserThunk = async (url, thunkAPI) => {
  try {
    const resp = await customUrl.get(url, {
      withCredentials: true,
    });

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export {
  editUserThunk,
  singleUserThunk,
  registerUserThunk,
  loginUserThunk,
  logoutUserThunk,
};
