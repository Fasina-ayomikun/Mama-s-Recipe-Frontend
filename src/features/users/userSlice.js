import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  removeFromLocalStorage,
  setToLocalStorage,
} from "../../utils/localStorage";
import {
  editUserThunk,
  forgotPasswordRequestThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  resetPasswordThunk,
  singleUserThunk,
} from "./userThunk";

const initialState = {
  isLoading: false,
  isError: false,
  isEdited: false,
  loggingInWithOAuth: false,
  image: "",
  user: [],
  profileUser: [],
  token: "",
};
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk("/auth/register", user, thunkAPI);
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/auth/login", user, thunkAPI);
  }
);

export const forgotPasswordRequest = createAsyncThunk(
  "auth/forgotPasswordRequest",
  async (user, thunkAPI) => {
    return forgotPasswordRequestThunk("/auth/forgot-password", user, thunkAPI);
  }
);
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (details, thunkAPI) => {
    return resetPasswordThunk(
      `/auth/forgot-password/reset/${details.token}`,
      details,
      thunkAPI
    );
  }
);
export const editUser = createAsyncThunk(
  "auth/editUser",
  async ({ id, formData }, thunkAPI) => {
    return editUserThunk(`/users/${id}`, formData, thunkAPI);
  }
);
export const singleUser = createAsyncThunk(
  "auth/singleUser",
  async (id, thunkAPI) => {
    return singleUserThunk(`/users/${id}`, thunkAPI);
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    return logoutUserThunk("/auth/logout", thunkAPI);
  }
);
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserEdited: (state) => {
      return { ...state, isEdited: false };
    },
    handleOAuth: (state) => {
      return { ...state, loggingInWithOAuth: true };
    },
    disableOAuth: (state) => {
      return { ...state, loggingInWithOAuth: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isLoading = false;
        state.isError = false;

        toast.success(payload.msg);
        setToLocalStorage(payload.user);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        toast.warning(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.user = payload.user;

        toast.success(payload.msg);
        setToLocalStorage(payload.user);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        toast.warning(payload);
      })

      .addCase(forgotPasswordRequest.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(forgotPasswordRequest.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.token = payload.token;
        toast.success(payload.msg);
      })
      .addCase(forgotPasswordRequest.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        toast.warning(payload);
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        localStorage.setItem(
          "Mama-recipe-user-password-updated",
          JSON.stringify(true)
        );
        toast.success(payload.msg);
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        toast.warning(payload);
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
        state.isEdited = false;
        state.isError = false;
      })
      .addCase(editUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.user = payload.user;
        state.isEdited = true;
        toast.success(payload.msg);
        setToLocalStorage(payload.user);
      })
      .addCase(editUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        toast.warning(payload);
      })
      .addCase(singleUser.pending, (state) => {
        state.isLoading = true;
        state.isEdited = false;
        state.isError = false;
      })
      .addCase(singleUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.profileUser = payload.user;
        localStorage.setItem(
          "Mama-recipe-user-profile",
          JSON.stringify(payload.user)
        );
      })
      .addCase(singleUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        toast.warning(payload);
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.user = null;

        toast.success(payload.msg);
        removeFromLocalStorage();
        window.location.reload(false);
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        toast.warning(payload);
      });
  },
});

export const { setProfile, setUserEdited, handleOAuth, disableOAuth } =
  userSlice.actions;

export default userSlice.reducer;
