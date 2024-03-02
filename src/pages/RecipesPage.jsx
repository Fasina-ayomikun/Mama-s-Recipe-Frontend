import React, { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ShowRecipe from "../components/ShowRecipe";
import Loading from "../utils/Loading";

import Filters from "../components/Filters";

function RecipesPage() {
  const [endSlice, setEndSlice] = useState(10);
  const { isLoading, recipes } = useSelector((state) => state.recipes);

  return (
    <>
      <Hero text='Recipes' />
      <section className='max-w-6xl w-full  px-4 mx-auto py-8'>
        <h3 className='text-3xl text-black font-semibold capitalize text-center my-4'>
          All Recipes
        </h3>
        <Filters />

        {isLoading ? (
          <Loading small={true} />
        ) : (
          <div className='grid lg:grid-cols-3 md:grid-cols-2  sm:grid-cols-1 gap-3 items-center justify-between mt-16 w-full'>
            {recipes.length < 1 ? (
              <p className='text-zinc-800'>No recipes to display.</p>
            ) : (
              recipes?.slice(0, endSlice).map((recipe) => {
                return <ShowRecipe key={recipe._id} recipe={recipe} />;
              })
            )}
          </div>
        )}
        {recipes.length <= 10 ? null : (
          <button
            className='capitalize border-b-2 rounded mx-auto flex my-12 text-zinc-800 border-dark-green'
            onClick={() =>
              setEndSlice((oldSlice) => {
                oldSlice = oldSlice + 5;
                if (oldSlice > recipes.length) {
                  oldSlice = recipes.length;
                }
                return oldSlice;
              })
            }
          >
            {endSlice === recipes.length ? "End of Recipes" : "more recipes"}
          </button>
        )}
      </section>
      <Footer />
    </>
  );
}

export default RecipesPage;
