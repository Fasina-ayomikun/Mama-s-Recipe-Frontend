import React from "react";
import { useNavigate } from "react-router-dom";

function ImgContainer({ img, user, small }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/profile/${user._id}`);
      }}
      className={`rounded-full aspect-square ${
        small ? "  w-full" : "sm:mx-auto  w-48"
      }`}
    >
      <img
        src={img || user?.profileImage?.url}
        alt=''
        className='aspect-square w-full object-cover rounded-full'
      />
    </div>
  );
}

export default ImgContainer;
