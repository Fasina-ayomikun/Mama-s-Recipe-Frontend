import React, { useEffect, useState } from "react";
import { initialQuery, numberList } from "../utils/utils";
import { getAllRecipes } from "../features/recipes/recipesSlice";
import { useDispatch } from "react-redux";
import { getUniqueValues } from "../utils/functions";

const Filters = () => {
  const [selectList, setSelectList] = useState({
    ingredients: [],
    equipments: [],
  });
  const [query, setQuery] = useState(initialQuery);

  const dispatch = useDispatch();
  const handleEvent = (input) => {
    const name = input.name;
    const value = input.value;
    setQuery({ ...query, [name]: value });
  };

  useEffect(() => {
    dispatch(getAllRecipes(query));
    getUniqueValues(setSelectList);
  }, []);
  return (
    <section>
      <div className='mt-16 flex md:flex-nowrap flex-wrap gap-y-4 gap-x-3'>
        <input
          type='text'
          name='search'
          value={query.search}
          onChange={(e) => handleEvent(e.target)}
          placeholder='Search...'
          className='w-full bg-gray-200 text-zinc-800 rounded-full  px-6 py-4  '
        />
        <select
          name='sort'
          value={query.sort}
          onChange={(e) => handleEvent(e.target)}
          className='bg-gray-200 text-zinc-800 sm:text-start md:text-center px-5 py-4 rounded-full sm:w-full md:w-5/12'
        >
          <option value='latest'>Sort by latest</option>
          <option value='popularity'>Sort by popularity</option>
          <option value='oldest'>Sort by oldest</option>
        </select>
      </div>
      <div className=' mb-24s flex gap-3 items-center w-full my-5 lg:flex-nowrap sm:flex-wrap'>
        <p className='text-zinc-800 w-24 '>Filter by: </p>
        <div className='flex gap-3 w-full lg:flex-nowrap flex-wrap'>
          <select
            name='ingredient'
            onChange={(e) => handleEvent(e.target)}
            value={query.ingredient}
            className='  bg-gray-200  text-center text-zinc-800  px-5 py-4 rounded-full w-full '
          >
            <option value=''>Ingredients</option>

            {selectList.ingredients.map((ingredient, index) => {
              return <option key={index}>{ingredient}</option>;
            })}
          </select>
          <select
            name='equipment'
            value={query.equipment}
            onChange={(e) => handleEvent(e.target)}
            className='  bg-gray-200 text-zinc-800  text-center px-5 py-4 rounded-full w-full '
          >
            <option value=''>Equipments</option>
            {selectList.equipments.map((equipment, index) => {
              return <option key={index}>{equipment}</option>;
            })}
          </select>
          <select
            name='minLikes'
            value={query.minLikes}
            onChange={(e) => handleEvent(e.target)}
            className='  bg-gray-200 text-zinc-800  text-center px-5 py-4 rounded-full sm:w-full '
          >
            <option value=''>No of Likes</option>

            {numberList.map((number, index) => (
              <option value={number} key={index}>
                {number}(&gt;)
              </option>
            ))}
          </select>
          <select
            name='minReviews'
            value={query.minReviews}
            onChange={(e) => handleEvent(e.target)}
            className='  bg-gray-200 text-zinc-800  text-center px-5 py-4 rounded-full sm:w-full md:w-full'
          >
            <option value=''>No of Reviews</option>

            {numberList.map((number, index) => (
              <option value={number} key={index}>
                {number}(&gt;)
              </option>
            ))}
          </select>
        </div>
        <button
          type='button'
          onClick={() => {
            dispatch(getAllRecipes(query));
          }}
          className=' mt-8 md:mt-0 text-center rounded-full cursor-pointer text-white py-4 px-10 bg-dark-green lg:w-fit sm:w-full'
        >
          Search
        </button>
      </div>
      <button
        type='button'
        className='underline cursor-pointer w-full flex justify-end '
        onClick={() => {
          setQuery(initialQuery);
          dispatch(getAllRecipes(initialQuery));
        }}
      >
        Clear Filters
      </button>
    </section>
  );
};

export default Filters;
