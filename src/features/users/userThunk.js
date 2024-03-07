import { customUrl } from "../../utils/axios";
import { removeFromLocalStorage } from "../../utils/localStorage";
const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customUrl.post(url, user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.msg);
  }
};
const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customUrl.post(url, user, {
      withCredentials: true,
    });
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.msg);
  }
};
const forgotPasswordRequestThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customUrl.post(url, user, {
      withCredentials: true,
    });
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.msg);
  }
};
const resetPasswordThunk = async (url, details, thunkAPI) => {
  try {
    const resp = await customUrl.post(
      url,
      { password: details.password, password2: details.password2 },
      {
        withCredentials: true,
      }
    );
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.msg);
  }
};
const logoutUserThunk = async (url, thunkAPI) => {
  try {
    const resp = await customUrl.get(url, {
      withCredentials: true,
    });
    removeFromLocalStorage();
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.msg);
  }
};
const editUserThunk = async (url, formData, thunkAPI) => {
  try {
    const resp = await customUrl.patch(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
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
  forgotPasswordRequestThunk,
  resetPasswordThunk,
};
