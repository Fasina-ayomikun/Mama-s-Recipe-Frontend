import React from "react";
import About from "../components/About";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function AboutPage() {
  return (
    <section className='text-grey'>
      <Navbar />

      <hr className='border-orange'></hr>
      <About />
      <Footer />
    </section>
  );
}

export default AboutPage;
