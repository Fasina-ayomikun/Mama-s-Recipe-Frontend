import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe } from "../features/singleRecipe/singleRecipeSlice";
import { checkUserPermission } from "../utils/functions";
import { useEffect } from "react";
import { getAllRecipes } from "../features/recipes/recipesSlice";

function ToggleModal({ id, email, files }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.singleRecipe);

  useEffect(() => {
    dispatch(getAllRecipes());
  }, []);

  return (
    <ul className='absolute w-48 mt-6 sm:right-2  rounded px-3 py-2  bg-zinc-800 text-grey text-md '>
      <li className='my-3'>
        <Link to={`/profile/${user._id}`} className='flex items-center gap-3'>
          <CgProfile className='text-2xl text-stone-500' /> View profile
        </Link>
      </li>{" "}
      {checkUserPermission(email) && (
        <>
          <li
            className='my-3'
            onClick={() => {
              localStorage.setItem(
                "Mama-recipe-edit-recipe",
                JSON.stringify(files)
              );
            }}
          >
            <Link to={`/edit/${id}`} className='flex items-center gap-3'>
              <AiFillEdit className='text-xl text-stone-500' /> Edit recipe
            </Link>
          </li>
          <li
            onClick={() => {
              dispatch(deleteRecipe(id));
              navigate("/recipes");
            }}
            className='my-3 flex items-center gap-3'
          >
            <FaTrash className='text-md text-stone-500' /> Delete recipe
          </li>
        </>
      )}
    </ul>
  );
}

export default ToggleModal;
