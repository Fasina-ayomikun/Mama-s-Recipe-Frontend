import React, { useState } from "react";
import Stars from "./Stars";
import { checkUser } from "./functions";
import { GrMoreVertical } from "react-icons/gr";
import { ReviewToggleModel } from "../modals";

const SingleReviewContent = ({ review, setOpenReview }) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };
  return (
    <div className='  flex items-start justify-between gap-8 bg-gray-200 py-3 px-5 rounded text-black w-full'>
      <div className='cursor-pointer'>
        <div className='stars  text-md mb-2 text-gold flex items-center '>
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
};

export default SingleReviewContent;
