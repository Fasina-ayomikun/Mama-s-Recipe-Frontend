import React, { useRef, useState } from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import emailjs from "@emailjs/browser";
import { autoResize } from "../utils/utils";
import { toast } from "react-toastify";
function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useRef();
  const inputRef = useRef();
  const textRef = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID, //service id
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID, //template id
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY //public key
      )
      .then(
        (result) => {
          toast.success("Message sent successfully");
          setIsLoading(false);
          inputRef.current.value = "";
          textRef.current.value = "";
        },
        (error) => {
          toast.error(error);
        }
      );
  };
  return (
    <>
      <Hero text='Contact' />
      <section className='max-w-2xl md:w-4/5 sm:w-9/12 mx-auto py-8'>
        <h3 className=' text-3xl  text-black font-semibold capitalize text-center my-4'>
          Contact Us
        </h3>
        <form ref={form} onSubmit={sendEmail}>
          <div className=' mt-16 '>
            <label htmlFor='email' className='block text-dark-green'>
              Email:
            </label>
            <input
              type='email'
              id='email'
              ref={inputRef}
              required
              name='user_email'
              className='mb-5 text-black block bg-transparent border-dark-green border-b-2  w-full rounded h-10 px-3 '
            />
            <label htmlFor='message' className='text-dark-green'>
              Message:
            </label>
            <textarea
              type='text'
              name='message'
              ref={textRef}
              id='message'
              required
              onKeyUp={(e) => autoResize(e.target)}
              className='resize-none  text-black bg-transparent  border-b-2  w-full  rounded h-20  px-3 border-dark-green '
            />
          </div>
          <button
            type='submit'
            onClick={() =>
              setTimeout(() => {
                setIsLoading(true);
              }, 1000)
            }
            disabled={isLoading ? true : false}
            className='capitalize border-2 py-3 px-16   rounded-full  mx-auto flex my-12 text-dark-green border-dark-green'
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
}

export default ContactPage;
