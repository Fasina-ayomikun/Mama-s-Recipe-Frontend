import React, { useEffect } from "react";
import About from "../components/About";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import PopularRecipes from "../components/PopularRecipes";
import Testimonial from "../components/Testimonial";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const [queryParams] = useSearchParams();
  const success = queryParams.get("success");
  const navigate = useNavigate();
  useEffect(() => {
    console.log(success);

    if (success) {
      toast.success("Payment successful, We love you");
      queryParams.delete("success");
    } else if (success === false) {
      toast.error("Payment not successful, Please try again ");
      queryParams.delete("success");
    }
    navigate("/");
  }, []);

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
