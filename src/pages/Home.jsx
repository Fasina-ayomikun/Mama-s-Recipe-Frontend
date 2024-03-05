import React, { useEffect } from "react";
import About from "../components/About";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import PopularRecipes from "../components/PopularRecipes";
import Testimonial from "../components/Testimonial";
import { useDispatch, useSelector } from "react-redux";
import { setToLocalStorage } from "../utils/localStorage";
import { customUrl } from "../utils/axios";
import { disableOAuth } from "../features/users/userSlice";

function Home() {
  return (
    <>
      <Hero text="Mama's recipe" />
      <PopularRecipes />
      <About />
      <Testimonial />
      <Footer></Footer>
    </>
  );
}

export default Home;
