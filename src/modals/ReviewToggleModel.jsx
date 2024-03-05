import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteReview,
  setEditReview,
  setEditReviewDetails,
  setRatings,
} from "../features/singleReview/singleReviewSlice";
import { checkUserPermission } from "../utils/functions";

function ReviewToggleModel({ review, profile, setOpenReview, closeModal }) {
  const dispatch = useDispatch();

  return (
    <ul className='addIndex absolute w-48 mt-6 right-28  sm:right-3 rounded px-3 py-2  bg-zinc-300    text-black text-md '>
      <li className='my-3 cursor-pointer'>
        {profile ? (
          <Link
            to={`/recipes/${review?.recipe._id}`}
            className='flex items-center gap-3'
          >
            <CgProfile className='text-2xl text-black opacity-60' /> View Recipe
          </Link>
        ) : (
          <Link
            to={`/profile/${review?.user?._id}`}
            className='flex items-center gap-3'
          >
            <CgProfile className='text-2xl text-black opacity-60' /> View
            profile
          </Link>
        )}
      </li>
      {!profile && checkUserPermission(review?.user?.email) && (
        <>
          <li
            className='my-3 flex items-center gap-3 cursor-pointer'
            onClick={() => {
              dispatch(setEditReview(review?._id));
              dispatch(
                setEditReviewDetails({
                  title: review.title,
                  comment: review.comment,
                  ratings: review.ratings,
                })
              );
              dispatch(setRatings(review.ratings - 1));
              setOpenReview();
              closeModal();
            }}
          >
            <AiFillEdit className='text-xl text-black opacity-60 ' /> Edit
            review
          </li>
          <li
            onClick={() => {
              dispatch(
                deleteReview({
                  reviewId: review._id,
                  recipeId: review.recipe._id,
                })
              );
              closeModal();
            }}
            className='my-3 flex items-center gap-3 cursor-pointer'
          >
            <FaTrash className='text-md text-black opacity-60' /> Delete review
          </li>
        </>
      )}
    </ul>
  );
}

export default ReviewToggleModel;
