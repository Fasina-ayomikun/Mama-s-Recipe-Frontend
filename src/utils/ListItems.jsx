import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTags } from "../features/singleRecipe/singleRecipeSlice";

function ListItems({ index, item, type }) {
  const dispatch = useDispatch();
  return (
    <li
      key={index}
      className='bg-zinc-700  px-3 rounded flex items-center gap-1 text-grey'
    >
      {item}
      <MdClose
        className='text-zinc-400 text-sm'
        onClick={() => {
          dispatch(deleteTags({ type, index }));
        }}
      />{" "}
    </li>
  );
}

export default ListItems;
