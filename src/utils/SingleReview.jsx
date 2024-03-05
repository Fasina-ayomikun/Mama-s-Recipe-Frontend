import React, { useEffect, useState } from "react";
import { GrMoreVertical } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { setEditReviewDetails } from "../features/singleReview/singleReviewSlice";
import ReviewToggleModel from "../modals/ReviewToggleModel";
import { checkUser } from "./functions";
import Stars from "./Stars";
import { IoIosSend } from "react-icons/io";
import { MdArrowDownward } from "react-icons/md";
import SingleReviewContent from "./SingleReviewContent";
import ReviewReplyModal from "./ReviewReplyModal";
import Loading from "./Loading";
import {
  clearState,
  createReply,
  editReply,
  handleChange,
} from "../features/singleReply/singleReplySlice";
import { getAllReplies } from "../features/replies/repliesSlice";

function SingleReview({ review, setOpenReview }) {
  const [openCommentSection, setOpenCommentSection] = useState(false);
  const { isLoading, replies } = useSelector((s) => s.replies);
  const { replyId, comment, isEditing } = useSelector((s) => s.singleReply);

  const dispatch = useDispatch();

  const handleEventChange = (input) => {
    const name = input.name;
    const value = input.value;
    dispatch(handleChange({ name, value }));
  };
  const handleSubmit = (e) => {
    console.log(isEditing);
    e.preventDefault();
    if (isEditing) {
      console.log("is editing");
      dispatch(editReply({ editId: replyId, comment, reviewId: review._id }));
    } else {
      console.log("creating");
      dispatch(createReply({ reviewId: review._id, comment }));
    }
  };
  useEffect(() => {
    if (review._id) {
      console.log(review._id);
      dispatch(getAllReplies(review._id));
    }
  }, []);
  return (
    <div className=' mb-5  '>
      <SingleReviewContent
        review={review}
        setOpenReview={setOpenReview}
        profile={false}
      />

      <p
        onClick={() => {
          setOpenCommentSection((prev) => !prev);
          dispatch(clearState());
        }}
        className='cursor-pointer text-sm text-zinc-800 pl-4 mt-2'
      >
        {replies.length} Comments | Add comment
      </p>
      {openCommentSection && (
        <div className='pl-2 md:pl-14 my-5 max-h-96  overflow-y-auto flex flex-col gap-2'>
          <form
            onSubmit={handleSubmit}
            className='flex items-center bg-gray-200  rounded-full  px-6 mb-3'
          >
            <input
              type='text'
              name='comment'
              value={comment}
              onChange={(e) => handleEventChange(e.target)}
              placeholder='Add a comment...'
              className='w-full bg-transparent text-zinc-800   '
            />
            <button
              type='submit'
              className='w-20 bg-dark-green rounded-full py-2  text-sm ml-4 my-4 px-3 text-white'
              my-4
            >
              {isEditing ? "Edit" : "Send"}
            </button>
          </form>
          {isLoading ? (
            <Loading small={true} />
          ) : (
            replies?.map((reply) => (
              <ReviewReplyModal reply={reply} key={reply._id} />
            ))
          )}{" "}
        </div>
      )}
    </div>
  );
}

export default SingleReview;
