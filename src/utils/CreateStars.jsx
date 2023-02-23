import React, { useEffect, useState } from "react";
import { BsStarHalf, BsStarFill, BsStar } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setRatings } from "../features/singleReview/singleReviewSlice";

function CreateStars() {
  const { ratings } = useSelector((s) => s.singleReview);
  const dispatch = useDispatch();
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    return (
      <span key={index}>
        {ratings >= index ? (
          <BsStarFill onClick={() => dispatch(setRatings(index))} />
        ) : (
          <BsStar onClick={() => dispatch(setRatings(index))} />
        )}
      </span>
    );
  });

  return <>{tempStars}</>;
}

export default CreateStars;
