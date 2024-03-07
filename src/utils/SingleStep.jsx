import React from "react";

function SingleStep({ instruction }) {
  const { step, details } = instruction;
  return (
    <details>
      <summary className='capitalize mr-2 text-dark-green   font-semibold text-lg'>
        Step {step}:
      </summary>
      <p className='text-sm mb-4 pl-6 '>{details}</p>
    </details>
  );
}

export default SingleStep;
