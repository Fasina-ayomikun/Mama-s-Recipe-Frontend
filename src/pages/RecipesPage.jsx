import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ShowRecipe from "../components/ShowRecipe";
import { getAllRecipes, handleChange } from "../features/recipes/recipesSlice";
import { getEquipments, getIngredients } from "../utils/functions";
import Loading from "../utils/Loading";

function RecipesPage() {
  const [endSlice, setEndSlice] = useState(10);
  const { isLoading, recipes, filteredRecipes } = useSelector(
    (state) => state.recipes
  );
  const dispatch = useDispatch();
  const ingredientRef = useRef();
  const textRef = useRef();
  const equipmentRef = useRef();

  const handleEvent = (input) => {
    const name = input.name;
    const value = input.value;
    dispatch(handleChange({ name, value }));
    if (name === "text") {
      equipmentRef.current.value = "all";
      ingredientRef.current.value = "all";
    } else if (name === "equipments") {
      ingredientRef.current.value = "all";
      textRef.current.value = "";
    } else {
      equipmentRef.current.value = "all";
      textRef.current.value = "";
    }
  };
  useEffect(() => {
    dispatch(getAllRecipes());
  }, []);
  return (
    <>
      <Hero text='Recipes' />
      <section className='max-w-5xl md:w-4/5 sm:w-9/12 mx-auto py-8'>
        <h3 className='text-3xl underline font-semibold capitalize text-center my-4'>
          All Recipes
        </h3>
        <div className=' mt-16 flex md:flex-nowrap sm:flex-wrap gap-y-4 gap-x-3'>
          <input
            type='text'
            name='text'
            ref={textRef}
            onChange={(e) => handleEvent(e.target)}
            placeholder='Search...'
            className='w-full bg-zinc-800 text-zinc-300 rounded h-10 px-3 '
          />
          <select
            ref={ingredientRef}
            name='ingredients'
            onChange={(e) => handleEvent(e.target)}
            className='  bg-zinc-800 text-zinc-300  h-10 px-3 rounded sm:w-full md:w-6/12'
          >
            <option value='all'>Ingredients</option>
            {getIngredients(recipes).map((ingredient, index) => {
              return <option key={index}>{ingredient}</option>;
            })}
          </select>
          <select
            ref={equipmentRef}
            name='equipments'
            onChange={(e) => handleEvent(e.target)}
            className='text-zinc-300  bg-zinc-800 h-10 px-3 rounded sm:w-full md:w-6/12'
          >
            <option value='all'>Equipments</option>
            {getEquipments(recipes).map((equipment, index) => {
              return <option key={index}>{equipment}</option>;
            })}
          </select>
        </div>
        {isLoading ? (
          <Loading small={true} />
        ) : (
          <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 items-center justify-between mt-16 w-full'>
            {filteredRecipes.length < 1 ? (
              <p className='text-grey'>No recipes to display.</p>
            ) : (
              filteredRecipes?.slice(0, endSlice).map((recipe) => {
                return <ShowRecipe key={recipe._id} recipe={recipe} />;
              })
            )}
          </div>
        )}
        {filteredRecipes.length <= 10 ? null : (
          <button
            className='capitalize border-b-2 rounded mx-auto flex my-12 text-grey border-orange'
            onClick={() =>
              setEndSlice((oldSlice) => {
                oldSlice = oldSlice + 5;
                if (oldSlice > filteredRecipes.length) {
                  oldSlice = filteredRecipes.length;
                }
                return oldSlice;
              })
            }
          >
            {endSlice === filteredRecipes.length
              ? "End of Recipes"
              : "more recipes"}
          </button>
        )}
      </section>
      <Footer />
    </>
  );
}

export default RecipesPage;
