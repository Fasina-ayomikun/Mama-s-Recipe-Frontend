import React, { useEffect, useState } from "react";
import { resetPassword } from "../features/users/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const dispatch = useDispatch();
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();
  const token = queryParams.get("token");
  let passwordUpdated = localStorage.getItem(
    "Mama-recipe-user-password-updated"
  );
  passwordUpdated = passwordUpdated ? JSON.parse(passwordUpdated) : null;
  useEffect(() => {
    if (passwordUpdated) {
      navigate("/login");
    }
  }, [passwordUpdated]);
  return (
    <section className='fixed w-screen  z-10 h-screen top-0 left-0 bg-white  flex items-center justify-center mx-auto'>
      <div className='lg:w-2/4 sm:11/12 text-zinc-800 py-5 px-4 rounded'>
        <h3 className='text-3xl font-extrabold tracking-wide text-center'>
          Password Reset
        </h3>

        <input
          type='text'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter your new password*'
          className='text-zinc-800 block bg-transparent border-dark-green border-b-2  w-full rounded h-10 px-3 mb-5 mt-6'
        />
        <input
          type='text'
          name='password2'
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder='Confirm your new password*'
          className='text-zinc-800 block bg-transparent border-dark-green border-b-2  w-full rounded h-10 px-3 mb-5 mt-6'
        />
        <button
          onClick={() => {
            if (password !== password2) {
              toast.warning("Passwords do not match");
              return;
            }
            dispatch(resetPassword({ token, password, password2 }));
            setPassword("");
            setPassword2("");
          }}
          className='capitalize border-b-2 rounded mx-auto flex  border-dark-green'
        >
          Reset Password
        </button>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
