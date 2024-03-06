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
  const [end, setEnd] = useState({ id: 0, end: true });
  const { isLoading, recipes, recipesTotal } = useSelector(
    (state) => state.recipes
  );
  let [page, setPage] = useState(2);
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
              recipes.map((recipe) => {
                return <ShowRecipe key={recipe._id} recipe={recipe} />;
              })
            )}
          </div>
        )}

        <div className='flex items-start gap-4 justify-center mx-auto mt-10 text-lg text-zinc-800 '>
          <p
            className={`flex item-center gap-2 ${
              end.id === 0 && end.end
                ? "text-zinc-800 cursor-not-allowed"
                : "cursor-pointer text-dark-green"
            }`}
            onClick={() => {
              if (end.id === 0 && !end.end) {
                dispatch(getAllRecipes({ ...initialQuery, page: page - 1 }));
              }
              setPage((prev) => {
                if (prev <= 2) {
                  setEnd({ id: 0, end: true });
                  return 1;
                } else {
                  setEnd({ id: 0, end: false });
                  return prev - 1;
                }
              });
            }}
          >
            <FaLongArrowAltLeft className='text-3xl' />
            Prev
          </p>

          <p
            className={`flex item-center gap-2  ${
              end.id === 1 && end.end
                ? "text-zinc-800 cursor-not-allowed"
                : "text-dark-green cursor-pointer"
            }`}
            onClick={() => {
              if (end.id === 1 && !end.end) {
                dispatch(getAllRecipes({ ...initialQuery, page }));
              }
              setPage((prev) => {
                if (prev === Math.ceil(recipesTotal / 10)) {
                  setEnd({ id: 1, end: true });

                  return Math.ceil(recipesTotal / 10);
                } else {
                  setEnd({ id: 1, end: false });
                  return prev + 1;
                }
              });
            }}
          >
            Next
            <FaLongArrowAltRight className='text-3xl' />
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default RecipesPage;
