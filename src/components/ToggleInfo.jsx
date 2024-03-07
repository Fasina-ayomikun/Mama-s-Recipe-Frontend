import React from "react";
import { BsStarFill } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa";

const ToggleInfo = ({ setOpenReviewsList, openReviewsList }) => {
  return (
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
  );
};

export default ToggleInfo;
