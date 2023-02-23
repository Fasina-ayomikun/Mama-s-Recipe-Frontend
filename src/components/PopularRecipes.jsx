import ShowRecipe from "./ShowRecipe";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllRecipes } from "../features/recipes/recipesSlice";
import { popularRecipes } from "../utils/functions";
function PopularRecipes() {
  const { recipes } = useSelector((store) => store.recipes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRecipes());
  }, []);

  return (
    <>
      <section className='max-w-5xl md:w-4/5 sm:w-9/12 mx-auto py-8'>
        <h3 className='text-3xl underline font-semibold capitalize text-center my-4'>
          Popular
        </h3>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 items-center justify-between mt-16 w-full'>
          {popularRecipes(recipes)
            .slice(0, 3)
            .map((recipe) => {
              return <ShowRecipe key={recipe._id} recipe={recipe} />;
            })}
        </div>
        <button className='border-b-2 rounded mx-auto flex my-12 text-grey border-orange'>
          <Link to='recipes'>View All Recipes</Link>
        </button>
      </section>
      <hr className='border-orange' />
    </>
  );
}

export default PopularRecipes;
