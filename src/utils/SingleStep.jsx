import React from "react";

function SingleStep({ index, step }) {
  return (
    <p className='text-md mb-4 '>
      <span className='capitalize mr-2 text-orange  underline font-semibold text-lg'>
        Step {index + 1}:
      </span>
      {step.step}
    </p>
  );
}

export default SingleStep;
