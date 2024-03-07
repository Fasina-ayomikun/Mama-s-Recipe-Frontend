import ShowRecipe from "./ShowRecipe";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllRecipes } from "../features/recipes/recipesSlice";
import { initialQuery } from "../utils/utils";
import Loading from "../utils/Loading";
function PopularRecipes() {
  const { isLoading, recipes } = useSelector((store) => store.recipes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRecipes({ ...initialQuery, sort: "popularity" }));
  }, []);

  return (
    <section>
      <section className='max-w-6xl w-full  mx-auto py-8'>
        <h3 className='text-3xl  font-semibold capitalize text-center my-4 text-black'>
          Explore Popular Recipes
        </h3>
        {isLoading ? (
          <Loading />
        ) : (
          <div className=' grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-3 items-center justify-between mt-16 w-full px-5 '>
            {recipes.slice(0, 3).map((recipe) => (
              <ShowRecipe key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
        <button className='border-b-2 rounded mx-auto flex my-12 text-gray-600 border-green'>
          <Link to='recipes'>View All Recipes</Link>
        </button>
      </section>
      <hr className='border-dark-green' />
    </section>
  );
}

export default PopularRecipes;
