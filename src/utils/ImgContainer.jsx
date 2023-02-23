import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function ImgContainer({ user, small }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/profile/${user._id}`);
      }}
      className={`${
        small
          ? "w-12 aspect-square rounded-full"
          : "sm:mx-auto  w-48 aspect-square rounded-full"
      }`}
    >
      <img
        src={
          user?.profileImage
            ? `${process.env.REACT_APP_SERVER_URL}${user?.profileImage}`
            : ""
        }
        alt=''
        className='aspect-square object-cover rounded-full'
      />
    </div>
  );
}

export default ImgContainer;
