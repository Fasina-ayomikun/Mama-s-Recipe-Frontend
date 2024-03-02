import React, { useEffect } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ImgContainer, SingleReview, SingleStep, Stars } from "../utils";
import { ReviewModal, ToggleModal } from "../modals";
import { useDispatch, useSelector } from "react-redux";
import { getSingleRecipe } from "../features/singleRecipe/singleRecipeSlice";
import Loading from "../utils/Loading";
import { getRecipeReviews } from "../features/reviews/reviewsSlice";
import Footer from "../components/Footer";
import { customUrl } from "../utils/axios";
import { FaRegCopy, FaRegEdit } from "react-icons/fa";
import { BsStarFill } from "react-icons/bs";
import { MdDelete, MdEmail, MdFavoriteBorder } from "react-icons/md";
import { getSingleUserRecipe } from "../features/recipes/recipesSlice";
import ShowRecipe from "../components/ShowRecipe";
import { checkUserPermission } from "../utils/functions";
import { toast } from "react-toastify";

function SingleRecipePage() {
  const [openReviewsList, setOpenReviewsList] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [openReview, setOpenReview] = useState(false);
  const [endSlice, setEndSlice] = useState(8);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    isLoading,
    name,
    ingredients,
    recipeId,
    noOfReviews,
    images,
    averageRatings,
    equipments,
    description,
    instructions,
    likers,
    noOfLikes,
    user,
  } = useSelector((store) => store.singleRecipe);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { reviews } = useSelector((store) => store.reviews);
  const { recipes, isLoading: isRecipesLoading } = useSelector(
    (store) => store.recipes
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const openReviewModal = () => {
    setOpenReview(true);
  };
  const toggleLike = async (id) => {
    setIsSubmitting(true);
    try {
      const resp = await customUrl.get(`/recipes/like/${id}`, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin":
            "https://nutty-bass-nightshirt.cyclic.app",
        },
      });
      console.log(resp);
      if (resp.status === 200) {
        dispatch(getSingleRecipe(id));
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        toast.warning("Please log in");
      } else {
        toast.warning(error.response.data.error.msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    dispatch(getSingleRecipe(id));
    dispatch(getRecipeReviews(id));
  }, []);

  useEffect(() => {
    if (user._id) {
      dispatch(getSingleUserRecipe(user._id));
    }
  }, [user]);
  if (isLoading) {
    return <Loading small={false} />;
  }
  return (
    <>
      <section className='text-black max-w-6xl w-full px-8 mx-auto py-8'>
        <Link
          to='/recipes'
          className='flex items-center  gap-3  text-dark-green my-5'
        >
          <HiOutlineArrowNarrowLeft className='text-3xl font-black ' />
          <span className='underline'>Back</span>
        </Link>

        <div className=' grid grid-row-2 lg:grid-cols-2 gap-6 '>
          <div className='w-full h-full'>
            <img
              src={images[imageIndex]?.url}
              alt=''
              className='object-cover w-full rounded'
            />
            <div className='grid mt-4 grid-cols-4 h-20 items-center gap-2'>
              {images.map((image, index) => (
                <img
                  key={image.id}
                  src={image.url}
                  alt=''
                  onClick={() => setImageIndex(index)}
                  className='object-cover w-full h-full  rounded'
                />
              ))}
            </div>
          </div>
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
                      <ToggleModal
                        setOpenDeleteModel={setOpenDeleteModal}
                        id={id}
                      />
                    )}
                  </div>
                )}
              </div>
              <div className='stars  text-sm text-gold flex items-center '>
                <Stars ratings={averageRatings} />
                <span className='text-zinc-800 text-xs ml-2'>
                  ( {noOfReviews} )
                </span>
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
                onClick={() => toggleLike(recipeId)}
                className='bg-dark-green capitalize border-2 py-3 px-5 md:px-16  w-full justify-center rounded-full items-center gap-2 flex mt-10 text-white  border-dark-green text-xs md:text-lg'
              >
                {likers.includes(user._id)
                  ? "Added to Favorites"
                  : "Add to Favorites"}
                <span className='block md:hidden'>( {noOfLikes} )</span>
                <MdFavoriteBorder className='text-xl hidden md:block' />
              </button>
            </div>
          </div>
        </div>
        <div className='mt-12 flex items-center justify-center gap-4 md:gap-20 '>
          <p
            onClick={() => setOpenReviewsList(false)}
            className={`cursor-pointer flex flex-col items-center  text-xl justify-center gap-4  py-3 ${
              openReviewsList ? "text-zinc-800 " : "text-dark-green"
            }`}
          >
            <FaRegCopy className='text-3xl ' /> Details
          </p>
          <p
            onClick={() => setOpenReviewsList(true)}
            className={`cursor-pointer flex flex-col items-center  text-xl justify-center gap-4  py-3 ${
              openReviewsList ? "text-dark-green" : "text-zinc-800 "
            }`}
          >
            <BsStarFill className='text-3xl ' /> Reviews
          </p>
        </div>
        <hr className='border-gray-500 my-6' />
        <div className={`${openReviewsList ? "hidden" : " block"}`}>
          <div className='flex-wrap flex items-start justify-evenly my-10 gap-5'>
            <div>
              <h3 className='text-xl font-extrabold tracking-wide mb-3'>
                Ingredients:
              </h3>
              <ol className='list-inside list-decimal'>
                {ingredients?.length < 1 ? (
                  <li>No Ingredients</li>
                ) : (
                  ingredients?.map((i, index) => {
                    return <li key={index}>{i}</li>;
                  })
                )}
              </ol>
            </div>{" "}
            <div>
              <h3 className='text-xl font-extrabold tracking-wide mb-3'>
                Equipments
              </h3>
              <ol className='list-inside list-decimal'>
                {equipments?.length < 1 ? (
                  <li>No Equipments</li>
                ) : (
                  equipments?.map((i, index) => {
                    return <li key={index}>{i}</li>;
                  })
                )}
              </ol>
            </div>{" "}
          </div>
          <h3 className='text-center text-2xl underline font-extrabold tracking-wide mb-3'>
            Instructions
          </h3>
          {instructions?.length < 1 ? (
            <p>No Instructions to display</p>
          ) : (
            instructions?.map((instruction, index) => {
              return <SingleStep key={index} instruction={instruction} />;
            })
          )}
          <h3 className='text-start mt-20 text-2xl  font-extrabold tracking-wide my-5'>
            Author
          </h3>
          <div className='flex flex-col lg:flex-row items-start gap-5'>
            <div
              onClick={() => {
                navigate(`/profile/${user._id}`);
              }}
              className='w-20 border-4 border-dark-green border-opacity-60 rounded-full'
            >
              <ImgContainer user={user} small={true} />
            </div>
            <div className='flex flex-col items-start gap-1'>
              <p className='text-gray-500 text-sm'>Added by</p>
              <h4 className='text-zinc-800 capitalize text-2xl font-bold break-all'>
                {user.firstName + " " + user.lastName}
              </h4>
              <p className='text-sm text-zinc-600 break-all'>{user.bio}</p>
              {/* FIXME: Fix mail sending */}
              <a
                href={`mailto:${user.email}?subject=Hello I really love your recipe`}
              >
                <MdEmail className='text-2xl text-dark-green' />
              </a>
            </div>
          </div>
          <h3 className='text-start mt-20 text-2xl  font-extrabold tracking-wide my-5'>
            Other Recipes
          </h3>
          {isRecipesLoading ? (
            <Loading small={true} />
          ) : (
            <div className='grid lg:grid-cols-3 md:grid-cols-2  sm:grid-cols-1 gap-3 items-center justify-between mt-16 w-full'>
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
        <div className={`${openReviewsList ? "block" : " hidden"}`}>
          <div className='my-7 mt-12 flex items-center justify-between '>
            <h3 className='text-xl font-extrabold tracking-wide '>Reviews</h3>
            <h5
              onClick={() => setOpenReview(true)}
              className='cursor-pointer underline text-dark-green text-sm'
            >
              Add Review
            </h5>

            {openReview && (
              <ReviewModal id={id} setOpenReview={setOpenReview} />
            )}
          </div>
          {isLoading ? (
            <Loading />
          ) : reviews.length < 1 ? (
            <h3>No reviews available for this recipe.</h3>
          ) : (
            reviews.slice(0, endSlice).map((review) => {
              return (
                <SingleReview
                  key={review._id}
                  review={review}
                  setOpenReview={openReviewModal}
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

export default SingleRecipePage;
