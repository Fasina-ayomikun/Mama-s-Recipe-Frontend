import React, { useEffect, useState } from "react";
import { GrMoreVertical } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { setEditReviewDetails } from "../features/singleReview/singleReviewSlice";
import ReviewToggleModel from "../modals/ReviewToggleModel";
import { checkUser } from "./functions";
import Stars from "./Stars";

function SingleReview({ review, setOpenReview }) {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };
  const { isEditing } = useSelector((s) => s.singleReview);
  const dispatch = useDispatch();

  return (
    <div className=' mb-5   flex items-start justify-between gap-8 bg-grey py-3 px-5 rounded text-black'>
      <div className='cursor-pointer'>
        <div className='stars  text-md mb-2 text-orange flex items-center '>
          <Stars ratings={review.ratings} />
        </div>
        <h6 className='text-md font-extrabold'>{review?.title}</h6>
        <p className='text-sm my-2'>{review?.comment}</p>
        <span className='italic text-zinc-700 text-xs  mt-2'>
          by {checkUser(review?.user)}
        </span>
      </div>
      <GrMoreVertical
        onClick={() => {
          setOpen(!open);
          setTimeout(() => {
            setOpen(false);
          }, 2000);
        }}
        className='text-xl text-black'
      />
      {open && (
        <ReviewToggleModel
          review={review}
          setOpenReview={setOpenReview}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default SingleReview;
