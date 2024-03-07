import React from "react";
import { BsStarHalf, BsStarFill, BsStar } from "react-icons/bs";

function Stars({ ratings }) {
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const num = index + 0.5;
    return (
      <span key={index}>
        {ratings >= index + 1 ? (
          <BsStarFill />
        ) : ratings >= num ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });
  return <>{tempStars}</>;
}

export default Stars;
