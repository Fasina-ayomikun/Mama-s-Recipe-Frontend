import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
import {
  createRecipeThunk,
  deleteRecipeThunk,
  editRecipeThunk,
  getSingleRecipeThunk,
} from "./singleRecipeThunk";

const initialState = {
  recipeId: "",
  name: "",
  description: "",
  category: "",
  ingredients: [],
  equipments: [],
  createdAt: "",
  instructions: [],
  averageRatings: "",
  isLoading: false,
  isEditing: false,
  noOfReviews: "",
  user: [],
  image: "",
  video: "",
};

export const getSingleRecipe = createAsyncThunk(
  "recipes/singleRecipe",
  getSingleRecipeThunk
);
export const createRecipe = createAsyncThunk(
  "recipes/createRecipe",
  async (body, thunkAPI) => {
    return createRecipeThunk(body, thunkAPI);
  }
);
export const editRecipe = createAsyncThunk(
  "recipes/editRecipe",
  async (body, thunkAPI) => {
    return editRecipeThunk(body, thunkAPI);
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (id, thunkAPI) => {
    return deleteRecipeThunk(id, thunkAPI);
  }
);
const singleRecipeSlice = createSlice({
  name: "singleRecipe",
  initialState,
  reducers: {
    handleChange: (state, { payload }) => {
      let { name, value, steps } = payload;
      if (name === "equipments") {
        if (!value.startsWith(" ") && value !== ",") {
          if (value.includes(",")) {
            value = value.split(",")[0];
            const valueFound = state.equipments.find((e) => e === value);
            if (valueFound) {
              state.equipments = [...state.equipments];
            } else {
              state.equipments = [...state.equipments, value];
            }
          }
        }
      } else if (name === "ingredients") {
        if (!value.includes(" ") && value !== ",") {
          if (value.includes(",")) {
            value = value.split(",")[0];
            const valueFound = state.ingredients.find((e) => e === value);
            if (valueFound) {
              state.ingredients = [...state.ingredients];
            } else {
              state.ingredients = [...state.ingredients, value];
            }
          }
        }
      } else if (name === "steps") {
        state.instructions = steps;
      } else {
        state[name] = value;
      }
    },
    clearState: (state) => {
      return initialState;
    },
    createStep: (state, { payload }) => {
      const { id } = payload;
      let stepToEdit = state.instructions.find((item) => item.id === id);
      if (stepToEdit) {
        return state;
      } else {
        return { ...state, instructions: [...state.instructions, payload] };
      }
    },
    editStep: (state, { payload }) => {
      const { id, step } = payload;
      let stepToEdit = state.instructions.find((item) => item.id === id);

      stepToEdit.step = step;
      return state;
    },
    deleteStep: (state, { payload }) => {
      const id = payload;
      const filteredSteps = state.instructions.filter((item) => item.id !== id);

      return { ...state, instructions: [...filteredSteps] };
    },

    deleteIngredient: (state, { payload }) => {
      state.ingredients.splice(payload, 1);
      return state;
    },
    deleteEquipment: (state, { payload }) => {
      state.equipments.splice(payload, 1);
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSingleRecipe.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getSingleRecipe.fulfilled, (state, { payload }) => {
        const {
          _id,
          name,
          description,
          averageRatings,
          ingredients,
          user,
          equipments,
          image,
          video,
          instructions,
          category,
          createdAt,
          noOfReviews,
        } = payload.recipe;
        toast.success(payload.msg);
        return {
          ...state,
          isLoading: false,
          isError: false,
          recipeId: _id,
          name,
          instructions,
          category,
          createdAt,
          description,
          ingredients,
          equipments,
          image,
          video,
          user,
          averageRatings,
          noOfReviews,
        };
      })
      .addCase(getSingleRecipe.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        handleError(payload);
      })
      .addCase(createRecipe.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createRecipe.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;

        toast.success(payload.msg);
        localStorage.setItem("Mama-recipe-created", JSON.stringify(true));
      })
      .addCase(createRecipe.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        handleError(payload);
      })
      .addCase(editRecipe.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isEditing = false;
      })
      .addCase(editRecipe.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;

        toast.success(payload.msg);
        localStorage.setItem("Mama-recipe-created", JSON.stringify(true));
      })
      .addCase(editRecipe.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isEditing = false;
        handleError(payload);
      });
  },
});
export const {
  handleChange,
  editStep,
  deleteStep,
  createStep,
  clearState,
  deleteIngredient,
  deleteEquipment,
} = singleRecipeSlice.actions;
export default singleRecipeSlice.reducer;
