import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { forgotPasswordRequest } from "../features/users/userSlice";
import { checkOutPayment } from "../utils/functions";
function ForgotPassword({ setOpen, password }) {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();

  return (
    <section className='fixed w-screen  z-10 h-screen top-0 left-0 bg-white  flex items-center justify-center mx-auto'>
      <MdClose
        onClick={() => {
          setOpen(false);
        }}
        className='absolute  right-10 top-10 text-3xl'
      ></MdClose>
      <div className='lg:w-2/4 sm:11/12 text-zinc-800 py-5 px-4 rounded'>
        <h3 className='text-3xl font-extrabold tracking-wide text-center'>
          {password
            ? "Request Password Reset"
            : "How much would you like to donate"}
        </h3>

        <input
          type={password ? "text" : "number"}
          name={password ? "email" : "amount"}
          value={password ? email : amount}
          onChange={(e) => {
            if (password) {
              setEmail(e.target.value);
            } else {
              setAmount(e.target.value);
            }
          }}
          placeholder={password ? "Enter your email*" : "Enter Amount"}
          className='text-zinc-800 block bg-transparent border-dark-green border-b-2  w-full rounded h-10 px-3 mb-5 mt-6'
        />
        <button
          onClick={() => {
            if (password) {
              dispatch(forgotPasswordRequest({ email }));
            } else {
              checkOutPayment(amount);
            }
          }}
          className='capitalize border-b-2 rounded mx-auto flex  border-dark-green'
        >
          {password ? "Verify Email" : "Checkout"}
        </button>
      </div>
    </section>
  );
}

export default ForgotPassword;
