import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ImgContainer, Stars } from "../utils";
import { checkUser } from "../utils/functions";
function ShowRecipe({ recipe }) {
  const {
    averageRatings,
    name,
    images,
    noOfReviews,
    user: recipeUser,
  } = recipe;
  return (
    <div className=' w-full  h-full '>
      <div className='relative h-48  w-full max-h-80 main-image'>
        <img
          src={images[0]?.url}
          alt=''
          className='rounded max-height h-full w-full object-cover'
        />
        <Link to={`/recipes/${recipe._id}`}>
          <div className='absolute left-0 top-0 grid place-content-center w-full h-full bg-black opacity-80 rounded'>
            <AiOutlineSearch className='text-4xl' />
          </div>
        </Link>
      </div>
      <div className='mt-3 flex items-start flex-wrap justify-between gap-3 break-all'>
        <h4 className=' text-md  sm:order-last'>{name} </h4>
        <h6 className='md:hidden underline text-zinc-300 text-xs '>
          <Link to={`/recipes/${recipe._id}`}>Read more</Link>
        </h6>
      </div>
      <div className='stars mt-2 text-xs flex items-center '>
        <Stars ratings={averageRatings} />
        <span className='text-grey text-xs ml-2'>( {noOfReviews} )</span>
      </div>
      <div className='flex items-center gap-3 mt-5'>
        <ImgContainer user={recipe.user} small={true} />
        <p className='text-sm italic'>by {checkUser(recipeUser)}</p>
      </div>
    </div>
  );
}

export default ShowRecipe;
