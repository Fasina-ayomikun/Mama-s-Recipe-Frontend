import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../images/logo-gold.png";
import { ImHome } from "react-icons/im";
import { BsQuestionCircle } from "react-icons/bs";
import {
  MdClose,
  MdContacts,
  MdFoodBank,
  MdOutlineFastfood,
} from "react-icons/md";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { AiFillProfile } from "react-icons/ai";
import { logoutUser } from "../features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getFromLocalStorage } from "../utils/localStorage";
import { setCloseSidebar, setOpenSidebar } from "../features/modal/modalSlice";
import { navLinks } from "../utils/utils";
function Sidebar() {
  const user = getFromLocalStorage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((s) => s.modal);
  return (
    <section
      className={
        isSidebarOpen
          ? " transition-all duration-700 translate-x-0  bg-white text-zinc-800  fixed h-screen w-full   left-0 z-20 lg:hidden bottom-0"
          : " transition-all duration-700 translate-x-full  bg-black fixed h-screen w-full   left-0 z-20 lg:hidden bottom-0"
      }
    >
      {" "}
      {user ? (
        <div className='flex items-center border-green sm:gap-6 lg:gap-10 border-b-2'>
          <div
            onClick={() => {
              navigate(`/profile/${user._id}`);
              dispatch(setCloseSidebar());
            }}
            className='w-32  aspect-square '
          >
            <img
              src={user?.profileImage?.url}
              alt=''
              className='aspect-square object-cover '
            />
          </div>
          <div className='sm:py-2 lg:py-4'>
            <h4 className='lg:text-3xl sm:text-lg font-extrabold text-black capitalize'>{`${user?.firstName} ${user?.lastName}`}</h4>
            {user?.displayName ? (
              <p className='lowercase italic text-zinc-800 my-1 text-sm '>{`@ ${user?.displayName}`}</p>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <>
          {/*/FIXME: MAkthe close icon show*/}
          <MdClose
            onClick={() => dispatch(setCloseSidebar())}
            className='absolute  right-5 top-5 text-black  bg-red-300 text-3xl'
          ></MdClose>
          <Link to='/'>
            <div className='mt-2 flex items-center text-black italic font-["Dancing_Script"]'>
              <img
                src={logo}
                alt=''
                className='md:w-24 sm:w-16 aspect-square'
              />
              <p className='md:text-2xl md:text-md text-dark-green'>
                Mama's Recipe
              </p>
            </div>
          </Link>
        </>
      )}
      <ul className='pl-6 mt-8 flex flex-col items-start justify-between text-black gap-6 text-lg capitalize'>
        {navLinks.map(({ name, url }, index) => (
          <li key={index} onClick={() => dispatch(setCloseSidebar())}>
            <NavLink
              className='flex items-center gap-2'
              to={url}
              activeClassName='active'
            >
              {name}
            </NavLink>
          </li>
        ))}
        {user ? (
          <>
            <li onClick={() => dispatch(setCloseSidebar())}>
              <NavLink
                to='/add'
                className='flex items-center gap-2'
                activeClassName='active'
              >
                <MdFoodBank /> Create recipe
              </NavLink>
            </li>

            <li onClick={() => dispatch(setCloseSidebar())}>
              <NavLink
                to={`/profile/${user._id}`}
                className='flex items-center gap-2'
                activeClassName='active'
              >
                <AiFillProfile /> View Profile
              </NavLink>
            </li>
            <li
              className='flex items-center gap-2'
              onClick={() => {
                dispatch(logoutUser());
                dispatch(setCloseSidebar());
              }}
            >
              <FiLogOut className='lg:hidden' />
              Logout
            </li>
          </>
        ) : (
          <li onClick={() => dispatch(setCloseSidebar())}>
            <NavLink className='flex items-center gap-2' to='/login'>
              <FiLogIn className='lg:hidden' /> Sign In
            </NavLink>
          </li>
        )}
      </ul>
    </section>
  );
}

export default Sidebar;
