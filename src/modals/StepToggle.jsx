import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteStep } from "../features/singleRecipe/singleRecipeSlice";

function StepToggle({ setEditId, id, setOpen, setNewStep, setEditingStep }) {
  const dispatch = useDispatch();

  return (
    <ul className='cursor-pointer absolute z-10 w-36 mt-3 sm:right-2  rounded px-3 py-2  bg-zinc-800 text-grey text-md '>
      <li
        className='my-3 flex items-center gap-3'
        onClick={(e) => {
          setOpen({ status: false });
          setEditId(id);
          setNewStep(true);
          setEditingStep(true);
        }}
      >
        <AiFillEdit className='text-xl text-stone-500' /> Edit step
      </li>
      <li
        onClick={() => {
          setOpen({ status: false });
          setEditId(id);
          dispatch(deleteStep(id));
          setEditingStep(false);
        }}
        className='my-3 flex items-center gap-3'
      >
        <FaTrash className='text-md text-stone-500' /> Delete step
      </li>
    </ul>
  );
}

export default StepToggle;
