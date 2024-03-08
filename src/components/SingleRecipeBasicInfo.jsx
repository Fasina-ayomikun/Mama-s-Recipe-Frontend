import React, { useState } from "react";
import Stars from "../utils/Stars";
import { checkUserPermission, toggleLike } from "../utils/functions";
import { MdDelete, MdFavoriteBorder } from "react-icons/md";
import { ToggleDeleteModal } from "../modals";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SingleRecipeBasicInfo = ({ id }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    name,
    recipeId,
    noOfReviews,
    images,
    averageRatings,
    description,
    likers,
    noOfLikes,
    user,
  } = useSelector((store) => store.singleRecipe);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className='flex flex-col justify-between '>
      <div>
        <div className='flex items-center justify-between gap-2 '>
          <h1 className='font-extrabold break-all tracking-wider capitalize my-3 text-3xl text-start text-black'>
            {name}
          </h1>
          {checkUserPermission(user?.email) && (
            <div className='flex items-center justify-between gap-3 text-2xl'>
              <FaRegEdit
                className='text-blue-600'
                onClick={() => {
                  localStorage.setItem(
                    "Mama-recipe-edit-recipe",
                    JSON.stringify({
                      isEditing: true,
                      images,
                    })
                  );
                  navigate(`/edit/${id}`);
                }}
              />
              <MdDelete
                onClick={() => setOpenDeleteModal(true)}
                className='text-red-400'
              />
              {openDeleteModal && (
                <ToggleDeleteModal
                  setOpenDeleteModel={setOpenDeleteModal}
                  id={id}
                />
              )}
            </div>
          )}
        </div>
        <div className='stars  text-sm text-gold flex items-center '>
          <Stars ratings={averageRatings} />
          <span className='text-zinc-800 text-xs ml-2'>( {noOfReviews} )</span>
        </div>
        <p className='break-all text-start tracking-wide text-sm mt-6'>
          {description}
        </p>
      </div>
      <div className='flex items-center gap-2 md:gap-4'>
        <button className='capitalize border-2 py-3 w-12 md:w-20 justify-center rounded-md hidden items-center gap-2 md:flex mt-10 text-zinc-800  border-zinc-800 '>
          {noOfLikes}
        </button>
        <button
          type='button'
          disabled={isSubmitting}
          onClick={() => toggleLike(recipeId, setIsSubmitting, dispatch)}
          className='bg-dark-green capitalize border-2 py-3 px-5 md:px-16  w-full justify-center rounded-full items-center gap-2 flex mt-10 text-white  border-dark-green text-xs md:text-lg'
        >
          {likers.includes(user?._id)
            ? "Added to Favorites"
            : "Add to Favorites"}
          <span className='block md:hidden'>( {noOfLikes} )</span>
          <MdFavoriteBorder className='text-xl hidden md:block' />
        </button>
      </div>
    </div>
  );
};

export default SingleRecipeBasicInfo;
