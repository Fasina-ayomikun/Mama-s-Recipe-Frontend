import React, { useEffect } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleRecipe } from "../features/singleRecipe/singleRecipeSlice";
import Loading from "../utils/Loading";
import { getRecipeReviews } from "../features/reviews/reviewsSlice";
import Footer from "../components/Footer";
import { getSingleUserRecipe } from "../features/recipes/recipesSlice";
import ToggleInfo from "../components/ToggleInfo";
import DetailsSection from "../components/DetailsSection";
import ReviewSection from "../components/ReviewSection";
import SingleRecipeBasicInfo from "../components/SingleRecipeBasicInfo";
function SingleRecipePage() {
  const [openReviewsList, setOpenReviewsList] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const { isLoading, images, user } = useSelector(
    (store) => store.singleRecipe
  );
  const dispatch = useDispatch();
  const { id } = useParams();

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
          <div className='w-full min-h-[200px] md:min-h-[500px] h-full'>
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
          <SingleRecipeBasicInfo id={id} />
        </div>
        <ToggleInfo
          setOpenReviewsList={setOpenReviewsList}
          openReviewsList={openReviewsList}
        />
        <hr className='border-gray-500 my-6' />
        <DetailsSection openReviewsList={openReviewsList} currentId={id} />
        <ReviewSection openReviewsList={openReviewsList} id={id} />
      </section>
      <Footer />
    </>
  );
}

export default SingleRecipePage;
