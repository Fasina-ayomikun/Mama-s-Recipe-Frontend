import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ShowRecipe from "../components/ShowRecipe";
import Loading from "../utils/Loading";
import Filters from "../components/Filters";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { getAllRecipes } from "../features/recipes/recipesSlice";
import { initialQuery } from "../utils/utils";

function RecipesPage() {
  const [endSlice, setEndSlice] = useState(10);
  const { isLoading, recipes, recipesTotal } = useSelector(
    (state) => state.recipes
  );
  let [page, setPage] = useState(1);
  const dispatch = useDispatch();

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

        <div className='flex items-start gap-4 justify-center mx-auto mt-10 text-lg text-zinc-800 '>
          <p
            className={`flex item-center gap-2 ${
              page === 1
                ? "text-zinc-800 cursor-not-allowed"
                : "cursor-pointer text-dark-green"
            }`}
            //FIXME:Fix Colour issue
            onClick={() => {
              setPage((prev) => {
                console.log(prev);
                if (prev === 1) {
                  return 1;
                } else {
                  return prev - 1;
                }
              });
              console.log(page);
              dispatch(getAllRecipes({ ...initialQuery, page }));
            }}
          >
            <FaLongArrowAltLeft className='text-3xl' />
            Prev
          </p>

          <p
            className={`flex item-center gap-2  ${
              page === Math.ceil(recipesTotal / 3)
                ? "text-zinc-800 cursor-not-allowed"
                : "text-dark-green cursor-pointer"
            }`}
            onClick={() => {
              setPage((prev) => {
                if (prev === Math.ceil(recipesTotal / 3)) {
                  return Math.ceil(recipesTotal / 3);
                } else {
                  return prev + 1;
                }
              });
              dispatch(getAllRecipes({ ...initialQuery, page }));
            }}
          >
            Next
            <FaLongArrowAltRight className='text-3xl' />
          </p>
        </div>
        {recipes.length <= 3 ? null : (
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
