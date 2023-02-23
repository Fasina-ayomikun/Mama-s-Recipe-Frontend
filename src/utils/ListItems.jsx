import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  deleteEquipment,
  deleteIngredient,
} from "../features/singleRecipe/singleRecipeSlice";

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
          if (type === "ingredients") {
            dispatch(deleteIngredient(index));
          }

          if (type === "equipments") {
            dispatch(deleteEquipment(index));
          }
        }}
      />{" "}
    </li>
  );
}

export default ListItems;
