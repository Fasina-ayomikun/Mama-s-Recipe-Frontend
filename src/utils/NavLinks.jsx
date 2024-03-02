import React from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { ImHome } from "react-icons/im";
import { MdContacts, MdOutlineFastfood } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../features/users/userSlice";

function NavLinks({ setOpenSideBar, isOpen }) {
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <ul className='pl-6  flex lg:flex-row sm:flex-col  lg:items-center sm:items-start justify-between text-zinc-800 gap-8 lg:text-md sm:text-xl capitalize'>
      <li>
        <NavLink
          onClick={() => setOpenSideBar(false)}
          className='flex items-center gap-2'
          to='/'
          activeClassName='active'
        >
          <ImHome className='lg:hidden' /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => setOpenSideBar(false)}
          className='flex items-center gap-2'
          to='/about'
          activeClassName='active'
        >
          <BsQuestionCircle className='lg:hidden' /> about
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => setOpenSideBar(false)}
          className='flex items-center gap-2'
          to='/recipes'
          activeClassName='active'
        >
          <MdOutlineFastfood className='lg:hidden' /> recipes
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => setOpenSideBar(false)}
          to='/contact'
          className='flex items-center gap-2'
          activeClassName='active'
        >
          <MdContacts className='lg:hidden' /> contact
        </NavLink>
      </li>
    </ul>
  );
}

export default NavLinks;
