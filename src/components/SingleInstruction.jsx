import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { StepToggle } from "../modals";

const SingleInstruction = ({
  instruction,
  setCreatingNewStep,
  setEditingStep,
  setStepToEditIndex,
}) => {
  const [openStepModal, setOpenStepModal] = useState({
    status: false,
    stepIndex: "",
  });
  const { step, details } = instruction;

  return (
    <div
      key={step}
      className='relative mb-1 text-zinc-800    bg-transparent  w-full  pb-3 px-3  flex gap-2 items-start'
    >
      <AiOutlineCheck className='text-3xl text-green-600' />
      <h3 className='text-dark-green font-bold'>Step{step}:</h3>
      <p className='break-all w-11/12 bg-transparent pr-8 resize-none'>
        {details}
      </p>
      <div className='relative'>
        <FiMoreHorizontal
          className={`${
            openStepModal.stepIndex === instruction.step && openStepModal.status
              ? "text-dark-green text-xl"
              : "text-zinc-800 text-xl"
          }`}
          onClick={() => {
            setOpenStepModal({
              status: !openStepModal.status,
              stepIndex: instruction.step,
            });
          }}
        />
        {openStepModal.stepIndex === instruction.step &&
          openStepModal.status && (
            <StepToggle
              step={instruction.step}
              setStepToEditIndex={setStepToEditIndex}
              setCreatingNewStep={setCreatingNewStep}
              setEditingStep={setEditingStep}
              setOpenStepModal={setOpenStepModal}
            />
          )}
      </div>
    </div>
  );
};

export default SingleInstruction;
