import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ImgContainer from "../utils/ImgContainer";
import { checkUserPermission } from "../utils/functions";
import { FaComments } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { getSingleRecipe } from "../features/singleRecipe/singleRecipeSlice";
import { useDispatch } from "react-redux";

function ShowRecipe({ recipe }) {
  const {
    name,
    images,
    description,
    noOfReviews,
    noOfLikes,
    user: recipeUser,
  } = recipe;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className=' w-full  h-full border rounded border-gray-200 relative pb-16'>
      <div className='relative h-56  w-full max-h-80 main-image'>
        <img
          src={images[0]?.url}
          alt=''
          className='rounded relative max-height h-full w-full object-cover'
        />
        <div className='bg-green z-10 bg-opacity-70 flex absolute bottom-0   left-0 right-0 items-center justify-between px-4 '>
          <h3 className='text-white m-0 text-md lg:text-lg xl:text-xl capitalize'>
            {checkUserPermission(recipeUser.email)
              ? "You"
              : recipeUser.firstName + " " + recipeUser.lastName}
          </h3>

          <div className='aspect-square rounded-full -mb-9 w-20 mt-2 border-4  border-green'>
            <ImgContainer user={recipeUser} small={true} />
          </div>
        </div>

        <div
          onClick={() => {
            navigate(`/recipes/${recipe._id}`);
            dispatch(getSingleRecipe(recipe._id));
          }}
          className='absolute gradient left-0 top-0 grid place-content-center w-full h-full bg-black opacity-50  rounded  transition-opacity'
        ></div>
      </div>
      <h4 className=' px-5 text-2xl font-semibold break-all capitalize mt-12 text-black text-center  '>
        {name}{" "}
      </h4>
      <p className='mt-2  text-sm text-center   break-all text-gray-500 px-6 lg:px-12'>
        {description.substring(0, 100)}
      </p>
      <h6 className='md:hidden  text-dark-green text-center text-xs mt-3 '>
        <Link to={`/recipes/${recipe._id}`}>Read more</Link>
      </h6>

      <div className='flex mt-6 absolute bottom-0 left-0 right-0'>
        <div className='w-full py-5 border-t border-r h-7 flex items-center gap-1 justify-center'>
          <FcLike />
          <p className=' text-sm text-gray-700  gap-1'>{noOfLikes}</p>
        </div>
        <div className='w-full py-5 border-t border-r h-7 flex items-center gap-1 justify-center'>
          <FaComments />
          <p className=' text-sm text-gray-700  gap-1'>{noOfReviews}</p>
        </div>
      </div>
    </div>
  );
}

export default ShowRecipe;
