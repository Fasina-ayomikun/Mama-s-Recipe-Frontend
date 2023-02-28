import React, { useEffect } from "react";
import { GrMoreVertical } from "react-icons/gr";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ImgContainer, SingleReview, SingleStep, Stars } from "../utils";
import { ReviewModal, ToggleModal } from "../modals";
import { useDispatch, useSelector } from "react-redux";
import { getSingleRecipe } from "../features/singleRecipe/singleRecipeSlice";
import Loading from "../utils/Loading";
import { getRecipeReviews } from "../features/reviews/reviewsSlice";
import Footer from "../components/Footer";

function SingleRecipePage() {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [endSlice, setEndSlice] = useState(8);
  const [imageLoading, setImageLoading] = useState(true);

  const {
    isLoading,
    name,
    ingredients,
    noOfReviews,
    image,
    averageRatings,
    equipments,
    description,
    instructions,
    user,
  } = useSelector((store) => store.singleRecipe);

  const { reviews } = useSelector((store) => store.reviews);
  const dispatch = useDispatch();
  const { id } = useParams();
  const openReviewModal = () => {
    setOpenReview(true);
  };
  useEffect(() => {
    dispatch(getSingleRecipe(id));
    dispatch(getRecipeReviews(id));
  }, []);
  useEffect(() => {
    if (image) {
      setImageLoading(false);
    }
  }, [imageLoading]);
  if (isLoading) {
    return <Loading small={false} />;
  }
  return (
    <>
      <section className='text-grey max-w-5xl md:w-4/5 sm:w-9/12 mx-auto py-8'>
        <Link
          to='/recipes'
          className='flex items-center  gap-3  text-orange my-5'
        >
          <HiOutlineArrowNarrowLeft className='text-3xl font-black ' />
          <span className='underline'>Back</span>
        </Link>
        <div className='flex item-center justify-between w-full mb-10'>
          <ImgContainer user={user} small={true} />
          <div className='cursor-pointer relative'>
            <GrMoreVertical
              onClick={() => {
                setOpen(!open);
                setTimeout(() => {
                  setOpen(false);
                }, [5000]);
              }}
              className='text-3xl text-grey'
            />
            {open && (
              <ToggleModal
                files={{
                  isEditing: true,
                  image,
                }}
                email={user?.email}
                id={id}
                setOpen={setOpen}
              />
            )}
          </div>
        </div>
        {imageLoading ? (
          <Loading small={true} />
        ) : (
          <img
            src={image}
            alt=''
            className='object-cover w-full h-48 rounded'
          />
        )}
        <div className='flex flex-wrap items-center justify-between gap-3 my-4'>
          <div className='stars  text-sm text-orange flex items-center '>
            <Stars ratings={averageRatings} />
            <span className='text-grey text-xs ml-2'>( {noOfReviews} )</span>
          </div>
        </div>
        <h1 className='font-extrabold tracking-wider my-6 text-2xl text-center'>
          {name}
        </h1>

        <p className='md:px-10 sm:px-2 text-center tracking-wide text-sm'>
          {description}
        </p>
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
          instructions?.map((step, index) => {
            return <SingleStep key={index} index={index} step={step} />;
          })
        )}
        <div className='my-7 mt-12 flex items-center justify-between '>
          <h3 className='text-xl font-extrabold tracking-wide '>Reviews</h3>
          <h5
            onClick={() => setOpenReview(true)}
            className='cursor-pointer underline text-orange text-sm'
          >
            Add Review
          </h5>

          {openReview && <ReviewModal id={id} setOpenReview={setOpenReview} />}
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
            className='capitalize border-b-2 rounded mx-auto flex my-12 text-grey border-orange'
          >
            {endSlice === reviews.length ? "End of reviews" : "more reviews"}{" "}
          </button>
        )}
      </section>
      <Footer />
    </>
  );
}

export default SingleRecipePage;
