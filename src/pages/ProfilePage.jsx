import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link, useParams } from "react-router-dom";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ShowRecipe from "../components/ShowRecipe";
import {
  getSingleUserRecipe,
  getUserFavoriteRecipe,
} from "../features/recipes/recipesSlice";
import { singleUser } from "../features/users/userSlice";
import { checkUserPermission } from "../utils/functions";
import ImgContainer from "../utils/ImgContainer";
import Loading from "../utils/Loading";
import { BsStarFill } from "react-icons/bs";
import { MdOutlineFastfood, MdOutlineFavorite } from "react-icons/md";
import { SingleReview } from "../utils";
import SingleReviewContent from "../utils/SingleReviewContent";
function ProfilePage() {
  const [endSlice, setEndSlice] = useState(10);
  const [open, setOpen] = useState(0);
  let currentProfile = JSON.parse(
    localStorage.getItem("Mama-recipe-user-profile")
  );
  const { recipes } = useSelector((s) => s.recipes);
  const { reviews } = useSelector((store) => store.reviews);

  const { profileUser, isLoading } = useSelector((s) => s.user);
  const { firstName, lastName, bio, createdAt } = profileUser;
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(singleUser(id));
    dispatch(getSingleUserRecipe(id));
  }, []);
  if (isLoading) {
    return <Loading small={false} />;
  }
  return (
    <>
      <Navbar />
      <section className='max-w-7xl w-full px-4 mx-auto py-8 '>
        <Link
          to='/recipes'
          className='flex items-center  gap-3  text-dark-green my-5'
        >
          <HiOutlineArrowNarrowLeft className='text-3xl font-black ' />
          <span className='underline'>Back</span>
        </Link>
        <div className='grid lg:grid-cols-2 item-start sm:grid-cols-1 lg:gap-0 sm:gap-10 max-w-3xl mt-16 mx-auto text-zinc-800   mb-10'>
          <div className='border-8 border-opacity-75 rounded-full border-dark-green  mx-auto'>
            <ImgContainer user={profileUser} small={false} />
          </div>
          <div className='relative'>
            {checkUserPermission(currentProfile?.email) && (
              <Link
                to='/profile/edit'
                className='text-dark-green absolute top-0 cursor-pointer right-0 text-xs flex  items-center gap-1 '
              >
                <AiOutlineEdit className='text-xl text-zinc-700' />
                Edit Profile
              </Link>
            )}
            <h3 className='text-3xl sm:mt-10 lg: mt-0 break-all  lg:text-start text-center font-semibold capitalize  my-4'>
              {firstName + " " + lastName}
            </h3>
            <p className='text-sm lg:text-start  sm:text-center my-5'>{bio}</p>
            <span className='italic text-xs text-zinc-500 mt-8'>
              joined at {moment(createdAt).format("MMMM Do YYYY")}
            </span>
          </div>
        </div>
        <hr />
        <div className='mt-12  flex items-center justify-center gap-4 md:gap-20 h-full '>
          <p
            onClick={() => {
              setOpen(0);
              dispatch(getSingleUserRecipe(id));
            }}
            className={`cursor-pointer flex flex-col items-center  text-md md:text-xl justify-center gap-4  py-3 ${
              open === 0 ? "text-dark-green" : "text-zinc-800 "
            }`}
          >
            <MdOutlineFastfood className='md:text-3xl text-2xl ' /> Recipes
          </p>
          <p
            onClick={() => {
              setOpen(1);
              dispatch(getUserFavoriteRecipe(id));
            }}
            className={`cursor-pointer flex flex-col items-center  text-md md:text-xl justify-center gap-4  py-3 ${
              open === 1 ? "text-dark-green" : "text-zinc-800 "
            }`}
          >
            <MdOutlineFavorite className='md:text-3xl text-2xl ' /> Favorites
          </p>
          <p
            onClick={() => setOpen(2)}
            className={`cursor-pointer flex flex-col items-center  text-md md:text-xl justify-center gap-4  py-3 ${
              open === 2 ? "text-dark-green" : "text-zinc-800 "
            }`}
          >
            <BsStarFill className='md:text-3xl text-2xl ' /> Reviews
          </p>
        </div>
        <div className={`relative pt-4 ${open === 0 ? "block" : " hidden"}`}>
          {checkUserPermission(currentProfile?.email) && (
            <Link
              to='/add'
              className='sm:hidden lg:flex text-dark-green absolute top-0 cursor-pointer right-0 text-xs flex  items-center gap-1 '
            >
              <AiOutlineEdit className='text-xl text-zinc-300' />
              Create Recipe
            </Link>
          )}
          {isLoading ? (
            <Loading small={true} />
          ) : (
            <div className='grid lg:grid-cols-3 md:grid-cols-2  sm:grid-cols-1 gap-3 items-center justify-between mt-16 w-full h-full'>
              {recipes.length < 1 ? (
                <p className='text-zinc-800 h-48'>No recipes to display.</p>
              ) : (
                recipes.map((recipe) => {
                  return <ShowRecipe key={recipe._id} recipe={recipe} />;
                })
              )}
            </div>
          )}
        </div>
        <div className={`  ${open === 1 ? "block" : " hidden"}`}>
          {isLoading ? (
            <Loading small={true} />
          ) : (
            <div className='grid lg:grid-cols-3 md:grid-cols-2  sm:grid-cols-1 gap-3 items-center justify-between mt-16 w-full'>
              {recipes.length < 1 ? (
                <p className='text-zinc-800 h-48'>
                  No recipe added to favorites
                </p>
              ) : (
                recipes.map((recipe) => {
                  return <ShowRecipe key={recipe._id} recipe={recipe} />;
                })
              )}
            </div>
          )}
          {recipes.length <= 10 || (
            <button
              onClick={() =>
                setEndSlice((oldSlice) => {
                  oldSlice = oldSlice + 5;
                  if (oldSlice > recipes.length) {
                    oldSlice = recipes.length;
                  }
                  return oldSlice;
                })
              }
              className='border-b-2 rounded mx-auto flex my-12 text-zinc-800 border-dark-green'
            >
              {endSlice === recipes.length ? "End of Recipes" : "more recipes"}
            </button>
          )}
        </div>
        <div className={` ${open === 2 ? "block" : " hidden"}`}>
          <div className='my-7 mt-12 flex items-center justify-between '>
            <h3 className='text-xl font-extrabold tracking-wide text-black'>
              Reviews
            </h3>
          </div>
          {isLoading ? (
            <Loading />
          ) : reviews.length < 1 ? (
            <h3 className='text-gray-400'>No reviews has been made</h3>
          ) : (
            reviews.slice(0, endSlice).map((review) => {
              return (
                <SingleReviewContent
                  review={review}
                  setOpenReview={() => {}}
                  profile={true}
                />
              );
            })
          )}
          {reviews.length < 10 || (
            <button
              onClick={() =>
                setEndSlice((oldSlice) => {
                  oldSlice = oldSlice + 5;
                  if (oldSlice > reviews.length) {
                    oldSlice = reviews.length;
                  }
                  return oldSlice;
                })
              }
              className='capitalize border-b-2 rounded mx-auto flex my-12 text-zinc-800 border-dark-green'
            >
              {endSlice === reviews.length ? "End of reviews" : "more reviews"}{" "}
            </button>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default ProfilePage;
