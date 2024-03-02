import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../features/users/userSlice";
import Loading from "../utils/Loading";
import ShowPassword from "../utils/ShowPassword";
import { IoLogoGoogle } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import SocialIcons from "../utils/SocialIcons";

const initialValue = {
  email: "",
  password: "",
};
function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState(initialValue);
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (input) => {
    const name = input.name;
    const newValue = input.value;
    setValue({ ...value, [name]: newValue });
  };
  const loginNewUser = (e) => {
    e.preventDefault();
    dispatch(loginUser(value));
  };
  useEffect(() => {
    if (!(user.length < 1)) navigate("/");
    setValue(initialValue);
  }, [user]);

  if (isLoading) {
    return <Loading small={false} />;
  }
  return (
    <section className='max-w-md   mx-auto py-8 sm:px-8 lg:px-0 mt-20'>
      <h3 className='text-3xl font-semibold capitalize text-center my-4 text-zinc-800'>
        login
      </h3>
      <form autoComplete='off' onSubmit={loginNewUser}>
        <div className='mt-10'>
          <input
            type='email'
            autoComplete='off'
            value={value.email}
            onChange={(e) => handleChange(e.target)}
            placeholder='Email'
            name='email'
            className='mb-5 text-zinc-800 block bg-transparent border-dark-green border-b-2  w-full rounded h-10 px-3 '
          />
          <div className=' mb-5 flex items-center gap-1 bg-transparent h-10 border-dark-green border-b-2 rounded'>
            <input
              type={`${showPassword ? "text" : "password"}`}
              value={value.password}
              placeholder='Password'
              name='password'
              autoComplete='off'
              onChange={(e) => handleChange(e.target)}
              className=' text-zinc-800 block w-full bg-transparent h-full  px-3 '
            />
            <ShowPassword
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </div>
        </div>
        <p className='text-xs text-zinc-800 text-end cursor-pointer'>
          Forgot Password?
        </p>
        <button
          type='submit'
          disabled={isLoading}
          className='capitalize border-2 py-2 px-14  rounded  mx-auto flex my-12 text-zinc-800 border-dark-green'
        >
          Login
        </button>
      </form>
      <SocialIcons />
      <p className='text-zinc-800 text-center text-sm'>
        Don't have an account?{" "}
        <Link className=' text-dark-green underline' to='/sign-up'>
          Register
        </Link>
      </p>
    </section>
  );
}

export default LoginPage;
