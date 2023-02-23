import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ShowRecipe from "../components/ShowRecipe";
import { getAllRecipes } from "../features/recipes/recipesSlice";
import { singleUser } from "../features/users/userSlice";
import { checkUserPermission, profileRecipes } from "../utils/functions";
import ImgContainer from "../utils/ImgContainer";
import Loading from "../utils/Loading";
function ProfilePage() {
  const [endSlice, setEndSlice] = useState(10);
  let currentProfile = JSON.parse(
    localStorage.getItem("Mama-recipe-user-profile")
  );
  const { recipes } = useSelector((s) => s.recipes);
  const profileUserRecipes = profileRecipes(recipes, currentProfile?._id);

  const { profileUser, isLoading } = useSelector((s) => s.user);
  const { firstName, lastName, bio, createdAt } = profileUser;
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(singleUser(id));
    dispatch(getAllRecipes());
  }, []);
  if (isLoading) {
    return <Loading small={false} />;
  }
  return (
    <>
      <Navbar />
      <section className='max-w-5xl md:w-4/5 sm:w-9/12 mx-auto py-8'>
        <Link
          to='/recipes'
          className='flex items-center  gap-3  text-orange my-5'
        >
          <HiOutlineArrowNarrowLeft className='text-3xl font-black ' />
          <span className='underline'>Back</span>
        </Link>
        <div className='grid lg:grid-cols-2 item-start sm:grid-cols-1 lg:gap-0 sm:gap-10 max-w-3xl mt-16 mx-auto text-grey   mb-10'>
          <ImgContainer user={profileUser} small={false} />
          <div className='relative'>
            {checkUserPermission(currentProfile?.email) && (
              <Link
                to='/profile/edit'
                className='text-orange absolute top-0 cursor-pointer right-0 text-xs flex  items-center gap-1 '
              >
                <AiOutlineEdit className='text-xl text-zinc-300' />
                Edit Profile
              </Link>
            )}
            <h3 className='text-3xl sm:mt-10 lg: mt-0  lg:text-start sm:text-center font-semibold capitalize text-center my-4'>
              {firstName + " " + lastName}
            </h3>
            <p className='text-sm lg:text-start  sm:text-center my-5'>{bio}</p>
            <span className='italic text-xs text-zinc-400 mt-8'>
              joined at {moment(createdAt).format("MMMM Do YYYY")}
            </span>
          </div>
        </div>
        <hr />
        <div className='relative'>
          <h3 className='underline mt-20 text-center text-grey text-2xl font-semibold capitalize text-center my-4'>
            All Recipes
          </h3>
          {checkUserPermission(currentProfile?.email) && (
            <Link
              to='/add'
              className='sm:hidden lg:flex text-orange absolute top-0 cursor-pointer right-0 text-xs flex  items-center gap-1 '
            >
              <AiOutlineEdit className='text-xl text-zinc-300' />
              Create Recipe
            </Link>
          )}
        </div>
        {isLoading ? (
          <Loading small={true} />
        ) : (
          <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 items-center justify-between mt-16 w-full'>
            {profileUserRecipes.length < 1 ? (
              <p className='text-grey h-48'>No recipes to display.</p>
            ) : (
              profileUserRecipes.map((recipe) => {
                return <ShowRecipe key={recipe._id} recipe={recipe} />;
              })
            )}
          </div>
        )}
        {profileUserRecipes.length <= 10 || (
          <button
            onClick={() =>
              setEndSlice((oldSlice) => {
                oldSlice = oldSlice + 5;
                if (oldSlice > profileUserRecipes.length) {
                  oldSlice = profileUserRecipes.length;
                }
                return oldSlice;
              })
            }
            className='border-b-2 rounded mx-auto flex my-12 text-grey border-orange'
          >
            {endSlice === profileUserRecipes.length
              ? "End of Recipes"
              : "more recipes"}
          </button>
        )}
      </section>
      <Footer />
    </>
  );
}

export default ProfilePage;
