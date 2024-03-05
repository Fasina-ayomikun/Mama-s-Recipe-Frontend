import React, { useEffect } from "react";
import { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { setOpenSidebar } from "../features/modal/modalSlice";
import { logoutUser } from "../features/users/userSlice";
import logo from "../images/logo-white.png";
import { getFromLocalStorage } from "../utils/localStorage";
import Sidebar from "./Sidebar";
import { navLinks } from "../utils/utils";
import ForgotPassword from "../modals/ForgotPassword";
function Navbar() {
  const [stickyNav, setStickyNav] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  let user = getFromLocalStorage();
  const navigate = useNavigate();
  useEffect(() => {
    const eventListener = window.addEventListener("scroll", () => {
      if (window.scrollY > window.innerHeight / 10) {
        setStickyNav(true);
      } else {
        setStickyNav(false);
      }
    });
    window.removeEventListener("scroll", eventListener);
  }, []);
  return (
    <div
      className={` bg-black z-50  w-screen px-3 md:px-6 mt-0${
        stickyNav && " fixed top-0 left-0 right-0"
      }`}
    >
      <div className='flex items-center gap-6 justify-between max-w-7xl lg:mx-auto '>
        <Link to='/'>
          <div className=' flex items-center text-grey italic font-["Dancing_Script"]'>
            <img src={logo} alt='' className='md:w-24 sm:w-16 aspect-square' />
            <p className='md:text-2xl text-md text-green'>Mama's Recipe</p>
          </div>
        </Link>
        <FiAlignJustify
          className='text-3xl text-grey lg:hidden'
          onClick={() => dispatch(setOpenSidebar())}
        />
        <Sidebar />
        <ul className='hidden lg:flex   items-center  justify-between text-grey gap-3 md:gap-5 text-md capitalize'>
          {navLinks.map(({ name, url }, index) => (
            <li key={index}>
              <NavLink to={url} activeClassName='active'>
                {name}
              </NavLink>
            </li>
          ))}

          {user?.email ? (
            <>
              <li className='cursor-pointer'>
                <NavLink to={`/profile/${user._id}`} activeClassName='active'>
                  profile
                </NavLink>
              </li>
              <li
                className='cursor-pointer'
                onClick={() => {
                  dispatch(logoutUser());
                }}
              >
                Logout
              </li>
            </>
          ) : (
            <li>
              <NavLink to='/login'>Sign In</NavLink>
            </li>
          )}
        </ul>{" "}
        <button
          onClick={() => {
            setOpen(true);
          }}
          className='border-2 hidden lg:block rounded-full py-2 px-6 bg-transparent border-green  text-green'
        >
          Buy us coffee
        </button>
        {open && <ForgotPassword setOpen={setOpen} password={false} />}
      </div>
    </div>
  );
}

export default Navbar;
