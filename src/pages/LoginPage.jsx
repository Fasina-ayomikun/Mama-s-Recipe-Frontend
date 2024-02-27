import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../features/users/userSlice";
import Loading from "../utils/Loading";
import ShowPassword from "../utils/ShowPassword";
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
      <h3 className='text-3xl font-semibold capitalize text-center my-4 text-grey'>
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
            className='mb-5 text-grey block bg-transparent border-orange border-b-2  w-full rounded h-10 px-3 '
          />
          <div className=' mb-5 flex items-center gap-1 bg-transparent h-10 border-orange border-b-2 rounded'>
            <input
              type={`${showPassword ? "text" : "password"}`}
              value={value.password}
              placeholder='Password'
              name='password'
              autoComplete='off'
              onChange={(e) => handleChange(e.target)}
              className=' text-grey block w-full bg-transparent h-full  px-3 '
            />
            <ShowPassword
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </div>
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className='capitalize border-2 py-2 px-14  rounded  mx-auto flex my-12 text-grey border-orange'
        >
          Login
        </button>
      </form>
      <p className='text-grey text-center text-sm'>
        Don't have an account?{" "}
        <Link className=' text-orange underline' to='/sign-up'>
          Register
        </Link>
      </p>
    </section>
  );
}

export default LoginPage;
