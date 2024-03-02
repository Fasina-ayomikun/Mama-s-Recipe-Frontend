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
import {
  deleteReply,
  setEditReply,
  setEditReplyDetails,
} from "../features/singleReply/singleReplySlice";

function ReplyToggleModal({ reply, setOpen }) {
  const dispatch = useDispatch();

  return (
    <ul className='addIndex absolute w-48 mt-6 sm:right-28   rounded px-3 py-2  bg-zinc-300    text-black text-md '>
      <li className='my-3 cursor-pointer'>
        <Link
          to={`/profile/${reply?.commenterId?._id}`}
          className='flex items-center gap-3'
        >
          <CgProfile className='text-2xl text-black opacity-60' /> View profile
        </Link>
      </li>
      {checkUserPermission(reply?.commenterId?.email) && (
        <>
          <li
            className='my-3 flex items-center gap-3 cursor-pointer'
            onClick={() => {
              dispatch(setEditReply(reply?._id));
              dispatch(
                setEditReplyDetails({
                  comment: reply.comment,
                })
              );
              setOpen(false);
            }}
          >
            <AiFillEdit className='text-xl text-black opacity-60 ' /> Edit
            Comment
          </li>
          <li
            onClick={() => {
              dispatch(
                deleteReply({ id: reply._id, reviewId: reply?.reviewId })
              );
            }}
            className='my-3 flex items-center gap-3 cursor-pointer'
          >
            <FaTrash className='text-md text-black opacity-60' /> Delete Comment
          </li>
        </>
      )}
    </ul>
  );
}

export default ReplyToggleModal;
