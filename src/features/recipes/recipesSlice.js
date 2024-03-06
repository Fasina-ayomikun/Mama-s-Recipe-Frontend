import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllRecipesThunk,
  getSingleUserRecipeThunk,
  getUserFavoriteRecipeThunk,
} from "./recipesThunk";

const initialState = {
  isLoading: true,

  isError: false,
  recipes: [],

  recipesTotal: 0,
};
export const getAllRecipes = createAsyncThunk(
  "recipes/allRecipes",
  getAllRecipesThunk
);
export const getSingleUserRecipe = createAsyncThunk(
  "recipes/singleUserRecipe",
  getSingleUserRecipeThunk
);
export const getUserFavoriteRecipe = createAsyncThunk(
  "recipes/singleUserFavoriteRecipe",
  getUserFavoriteRecipeThunk
);
const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    handleChange: (state, { payload }) => {
      const { name, value } = payload;
      let tempRecipes = [...state.recipes];
      if (name === "text" && value !== "") {
        tempRecipes = tempRecipes.filter((recipe) =>
          recipe.name.toLowerCase().startsWith(value.toLowerCase())
        );
      }
      if (name === "equipments" && value !== "all") {
        tempRecipes = tempRecipes.filter((recipe) =>
          recipe.equipments.includes(value)
        );
      }
      if (name === "ingredients" && value !== "all") {
        tempRecipes = tempRecipes.filter((recipe) =>
          recipe.ingredients.includes(value)
        );
      }
      return { ...state, filteredRecipes: tempRecipes };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRecipes.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllRecipes.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.recipes = payload.recipes;
        state.recipesTotal = payload.totalLength;
      })
      .addCase(getAllRecipes.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;

        toast.warning(payload);
      })
      .addCase(getUserFavoriteRecipe.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getUserFavoriteRecipe.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.recipes = payload.recipes;
      })
      .addCase(getUserFavoriteRecipe.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        toast.warning(payload);
      })
      .addCase(getSingleUserRecipe.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getSingleUserRecipe.fulfilled, (state, { payload }) => {
        toast.success(payload.msg);
        return {
          ...state,
          isLoading: false,
          isError: false,
          recipes: payload.recipes,
        };
      })
      .addCase(getSingleUserRecipe.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        toast.warning(payload);
      });
  },
});

export const { handleChange } = recipesSlice.actions;
export default recipesSlice.reducer;
