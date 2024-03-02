import React from "react";
import { FaGithub, FaInstagramSquare } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io5";

const SocialIcons = () => {
  return (
    <div className='flex items-center justify-center gap-8 mb-5'>
      <button className='border-2 border-red-700 px-7 text-xl py-2 text-red-700 rounded-md'>
        <IoLogoGoogle />
      </button>
      <button className='border-2 border-black px-7 text-xl py-2 text-black rounded-md'>
        <FaGithub />
      </button>
      <button className='border-2 border-red-400 px-7 text-xl py-2 text-red-400 rounded-md'>
        <FaInstagramSquare />
      </button>
    </div>
  );
};

export default SocialIcons;