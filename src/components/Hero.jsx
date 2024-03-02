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
    <section className='w-screen relative flex justify-between   h-screen bg-background bg-cover bg-no-repeat flex-col'>
      <Navbar />
      <div
        className={`w-screen h-screen bg-black   absolute top-0 left-0 right-0 bottom-0 ${
          stickyNav || isSidebarOpen ? "" : " opacity-50"
        }`}
      ></div>
      <div className='w-screen  h-3/4 z-10  sm:px-2'>
        <div className=' h-4/5 grid place-content-center  '>
          <h1 className='font-extrabold  tracking-widest uppercase text-center h1-mt text-white lg:text-6xl  md:text-5xl sm:text-3xl'>
            {text}
          </h1>
          <p className='text-center italic md:text-xl sm:text-lg text-green shadow-black  mt-2'>
            Explore your favorite homemade recipe
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
