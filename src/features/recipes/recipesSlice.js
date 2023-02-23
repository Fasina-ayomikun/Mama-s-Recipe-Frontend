import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { handleError } from "../../utils/handleError";
import { getAllRecipesThunk } from "./recipesThunk";

const initialState = {
  isLoading: true,

  isError: false,
  recipes: [],
  filteredRecipes: [],
};
export const getAllRecipes = createAsyncThunk(
  "recipes/allRecipes",
  getAllRecipesThunk
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
        state.filteredRecipes = [...payload.recipes];
      })
      .addCase(getAllRecipes.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        handleError(payload);
      });
  },
});

export const { handleChange } = recipesSlice.actions;
export default recipesSlice.reducer;
