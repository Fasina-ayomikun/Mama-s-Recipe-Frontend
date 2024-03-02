import React from "react";
import About from "../components/About";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function AboutPage() {
  return (
    <section className='text-zinc-800'>
      <Navbar />

      <hr className='border-dark-green'></hr>
      <About />
      <Footer />
    </section>
  );
}

export default AboutPage;
