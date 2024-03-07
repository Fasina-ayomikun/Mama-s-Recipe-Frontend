import React, { useState } from "react";
import SingleReview from "../utils/SingleReview";
import Loading from "../utils/Loading";
import { ReviewModal } from "../modals";
import { useSelector } from "react-redux";

const ReviewSection = ({ openReviewsList, id }) => {
  const [openReview, setOpenReview] = useState(false);
  const [endSlice, setEndSlice] = useState(8);
  const { reviews, isLoading } = useSelector((store) => store.reviews);
  const openReviewModal = () => {
    setOpenReview(true);
  };
  return (
    <div className={`${openReviewsList ? "block" : " hidden"}`}>
      <div className='my-7 mt-12 flex items-center justify-between '>
        <h3 className='text-xl font-extrabold tracking-wide '>Reviews</h3>
        <h5
          onClick={() => setOpenReview(true)}
          className='cursor-pointer underline text-dark-green text-sm'
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
          className='capitalize border-b-2 rounded mx-auto flex my-12 text-zinc-800 border-dark-green'
        >
          {endSlice === reviews.length ? "End of reviews" : "more reviews"}{" "}
        </button>
      )}
    </div>
  );
};

export default ReviewSection;
