import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <section className='w-screen h-screen grid place-content-center mx-auto '>
      <div className=' '>
        <h1 className='text-9xl font-black text-center text-grey'>404</h1>

        <Link to='/' className=' underline text-center  flex justify-center'>
          Go Home
        </Link>
      </div>
    </section>
  );
}

export default ErrorPage;
