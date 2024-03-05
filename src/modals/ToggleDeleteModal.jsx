import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteRecipe } from "../features/singleRecipe/singleRecipeSlice";
import { useEffect } from "react";
import { getAllRecipes } from "../features/recipes/recipesSlice";

function ToggleDeleteModal({ setOpenDeleteModel, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllRecipes());
  }, []);

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0  w-screen h-screen bg-black bg-opacity-60 flex items-center justify-center'>
      <div className='w-2/3 h-44 bg-white max-w-xl rounded-lg p-8'>
        <p className='font-bold text-center'>Are you sure?</p>
        <div className='mt-7 flex items-center justify-center gap-4 '>
          <button
            onClick={() => {
              setOpenDeleteModel(false);
            }}
            type='button'
            className='border-2 text-red-400  rounded-full py-2 px-6 bg-transparent text-sm border-red-400 w-full'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={() => {
              dispatch(deleteRecipe(id));
              navigate("/recipes");
            }}
            className='text-white  rounded-full py-2  w-full text-sm px-6 bg-dark-green '
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToggleDeleteModal;
