import React from "react";
import { MdClose } from "react-icons/md";
import {
  clearState,
  createReview,
  editReview,
  handleChange,
} from "../features/singleReview/singleReviewSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../utils/Loading";
import CreateStars from "../utils/CreateStars";
function ReviewModal({ id, setOpenReview }) {
  const dispatch = useDispatch();
  const { isLoading, isEditing, reviewId, title, comment, ratings, createdAt } =
    useSelector((s) => s.singleReview);
  const handleEventChange = (input) => {
    const name = input.name;
    const value = input.value;
    dispatch(handleChange({ name, value }));
  };
  const handleSubmit = () => {
    if (isEditing) {
      dispatch(
        editReview({
          reviewId,
          ratings: ratings + 1,
          title,
          comment,
          recipe: id,
        })
      );
    } else {
      dispatch(
        createReview({
          recipe: id,
          title,
          comment,
          ratings: ratings + 1,
          createdAt,
        })
      );
    }
  };

  if (isLoading) {
    return (
      <section className='h-screen z-10 w-screen bg-black fixed top-0 left-0'>
        <Loading small={false} />
      </section>
    );
  }
  return (
    <section className='fixed w-screen  z-10 h-screen top-0 left-0 bg-black  flex items-center justify-center mx-auto'>
      <MdClose
        onClick={() => {
          setOpenReview(false);
          dispatch(clearState());
        }}
        className='absolute  right-10 top-10 text-3xl'
      ></MdClose>
      <div className='lg:w-2/4 sm:11/12 text-grey py-5 px-4 rounded'>
        <h3 className='text-3xl font-extrabold tracking-wide text-center'>
          Review
        </h3>
        <div className='stars  my-5  text-4xl text-orange flex items-center justify-center '>
          <CreateStars />
        </div>
        <input
          type='text'
          name='title'
          placeholder='Title*'
          defaultValue={title}
          onKeyUp={(e) => handleEventChange(e.target)}
          className='text-grey block bg-transparent border-orange border-b-2  w-full rounded h-10 px-3 mb-5'
        />
        <input
          type='text'
          name='comment'
          defaultValue={comment}
          placeholder='Details'
          onKeyUp={(e) => handleEventChange(e.target)}
          className=' text-grey block bg-transparent border-orange  border-b-2  w-full rounded h-10 px-3 mb-5'
        />
        <button
          onClick={() => handleSubmit()}
          className='capitalize border-b-2 rounded mx-auto flex  border-orange'
        >
          {isEditing ? "Edit Review" : "add Review"}
        </button>
      </div>
    </section>
  );
}

export default ReviewModal;
