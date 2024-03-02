import React from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const ShowPassword = ({ showPassword, setShowPassword }) => {
  return (
    <>
      {showPassword ? (
        <AiFillEye
          className='text-zinc-800 text-3xl opacity-60'
          onClick={() => setShowPassword(!showPassword)}
        />
      ) : (
        <AiFillEyeInvisible
          className='text-zinc-800 text-3xl opacity-60'
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
    </>
  );
};

export default ShowPassword;
