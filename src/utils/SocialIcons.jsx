import React from "react";
import { FaGithub, FaInstagramSquare } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io5";
import { useDispatch } from "react-redux";

const SocialIcons = () => {
  const dispatch = useDispatch();
  return (
    <div className='flex items-center justify-center gap-8 mb-5'>
      <a href={`${process.env.REACT_APP_SERVER_URL}/api/v1/oauth/google`}>
        <button className='border-2 border-red-700 px-7 text-xl py-2 text-red-700 rounded-md'>
          <IoLogoGoogle />
        </button>
      </a>
      <a href={`${process.env.REACT_APP_SERVER_URL}/api/v1/oauth/github`}>
        <button className='border-2 border-black px-7 text-xl py-2 text-black rounded-md'>
          <FaGithub />
        </button>
      </a>
      <button className='border-2 border-red-400 px-7 text-xl py-2 text-red-400 rounded-md'>
        <FaInstagramSquare />
      </button>
    </div>
  );
};

export default SocialIcons;
