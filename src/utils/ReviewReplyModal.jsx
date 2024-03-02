import React, { useState } from "react";
import Stars from "./Stars";
import { checkUser } from "./functions";
import { GrMoreVertical } from "react-icons/gr";
import { ReviewModal, ReviewToggleModel } from "../modals";
import ReplyToggleModal from "../modals/ReplyToggleModal";

const ReviewReplyModal = ({ reply }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className='  flex items-start justify-between gap-8 bg-gray-200 py-3 px-5 rounded text-black w-full'>
      <div className='cursor-pointer'>
        <p className='text-sm my-2'>{reply?.comment}</p>
        <span className='italic text-zinc-700 text-xs  mt-2'>
          by {checkUser(reply?.commenterId)}
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
      {open && <ReplyToggleModal setOpen={setOpen} reply={reply} />}
    </div>
  );
};

export default ReviewReplyModal;
