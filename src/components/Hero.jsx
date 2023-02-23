import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import { useSelector } from "react-redux";
function Hero({ text }) {
  const [stickyNav, setStickyNav] = useState(false);
  const { isSidebarOpen } = useSelector((s) => s.modal);
  useEffect(() => {
    const eventListener = window.addEventListener("scroll", () => {
      if (window.scrollY > window.innerHeight) {
        setStickyNav(true);
      } else {
        setStickyNav(false);
      }
    });
    window.removeEventListener("scroll", eventListener);
  }, []);
  return (
    <section className='w-screen  h-screen bg-background bg-cover bg-no-repeat'>
      <div
        className={`w-screen h-screen bg-black   flex justify-center items-center${
          stickyNav || isSidebarOpen ? "" : " opacity-90"
        }`}
      >
        <div className='w-11/12 h-5/6   md:border-2 rounded border-orange sm:px-2 md:px-8'>
          <Navbar />
          <div className=' h-4/5 grid place-content-center  '>
            <h1 className='font-extrabold  tracking-widest uppercase text-center h1-mt text-orange lg:text-5xl  md:text-4xl sm:text-3xl'>
              {text}
            </h1>
            <p className='text-center italic md:text-md sm:text-sm text-grey mt-2'>
              My home made delicacies
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
