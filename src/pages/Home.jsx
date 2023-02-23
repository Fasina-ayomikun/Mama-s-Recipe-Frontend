import React from "react";
import About from "../components/About";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import PopularRecipes from "../components/PopularRecipes";
import Testimonial from "../components/Testimonial";

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
