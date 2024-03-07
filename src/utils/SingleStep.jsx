import React from "react";

function SingleStep({ instruction }) {
  const { step, details } = instruction;
  return (
    <p className='text-md mb-4 '>
      <span className='capitalize mr-2 text-dark-green  underline font-semibold text-lg'>
        Step {step}:
      </span>
      {details}
    </p>
  );
}

export default SingleStep;
