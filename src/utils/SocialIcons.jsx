import React from "react";
import { FaGithub } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io5";

const SocialIcons = () => {
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
    </div>
  );
};

export default SocialIcons;
