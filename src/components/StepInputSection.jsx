import React, { useState } from "react";
import {
  createStep,
  editStep,
} from "../features/singleRecipe/singleRecipeSlice";
import { useDispatch, useSelector } from "react-redux";

const StepInputSection = ({
  setCreatingNewStep,
  stepToEditIndex,
  setStepToEditIndex,
  setEditingStep,
  editingStep,
}) => {
  const [stepText, setStepText] = useState("");
  const { isLoading, instructions } = useSelector(
    (store) => store.singleRecipe
  );

  const dispatch = useDispatch();
  return (
    <>
      <input
        value={stepText}
        readOnly={isLoading}
        onChange={(e) => setStepText(e.target.value)}
        placeholder='Type here...'
        className='mb-6 text-zinc-800   bg-transparent border-dark-green border-b-2  w-full rounded  pb-3 px-3  flex gap-2 items-center'
      ></input>

      <button
        className='cursor-pointer text-center underline mx-auto flex'
        type='button'
        onClick={() => {
          setCreatingNewStep(false);
          if (!(stepText.length >= 1)) return;
          if (editingStep) {
            dispatch(editStep({ step: stepToEditIndex, details: stepText }));
            setStepToEditIndex("");
            setEditingStep(false);
          } else {
            dispatch(
              createStep({
                step: instructions.length + 1,
                details: stepText,
              })
            );
          }
        }}
      >
        {editingStep ? "Edit" : "Add"}
      </button>
    </>
  );
};

export default StepInputSection;
