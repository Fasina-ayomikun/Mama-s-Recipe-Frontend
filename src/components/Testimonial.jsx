import React from "react";
import hero from "../images/hero.jpg";
import { ImgContainer, Stars } from "../utils";
function Testimonial() {
  return (
    <>
      <hr className='border-grey' />
      <section className='max-w-5xl md:w-4/5 sm:w-9/12 mx-auto  py-16'>
        <h3 className='text-3xl  font-semibold capitalize text-black text-center my-4'>
          Testimonials
        </h3>
        <div className='gap-16 grid lg:grid-cols-2  sm:grid-cols-1  items-center justify-between mt-16 w-full'>
          <div className='w-full h-full '>
            <div className='stars mt-2 text-sm flex items-center text-gold '>
              <Stars />
            </div>
            <p className='my-5 text-gray-600 text-md italic'>
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
              architecto quaerat optio veritatis dignissimos in, totam nisi
              doloribus fuga, adipisci laborum, quod reprehenderit. Ipsum atque,
              accusamus a consectetur eum voluptas."
            </p>
            <div className='flex items-center gap-3 mt-5'>
              <div className='w-12'>
                <ImgContainer img={hero} small={true} />
              </div>{" "}
              <p className='text-sm'>Alex Stone</p>
            </div>
          </div>
          <div className='w-full h-full '>
            <div className='stars mt-2 text-sm flex items-center text-gold '>
              <Stars />
            </div>
            <p className='my-5 text-gray-600 text-md italic'>
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
              architecto quaerat optio veritatis dignissimos in, totam nisi
              doloribus fuga, adipisci laborum, quod reprehenderit. Ipsum atque,
              accusamus a consectetur eum voluptas."
            </p>
            <div className='flex items-center gap-3 mt-5'>
              <div className='w-12'>
                <ImgContainer img={hero} small={true} />
              </div>
              <p className='text-sm'>Alex Stone</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Testimonial;
