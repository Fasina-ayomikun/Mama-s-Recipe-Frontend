import React from "react";
import { MdClose } from "react-icons/md";
import Loading from "../utils/Loading";
function ShowVideo({ videoLoading, video, setOpenModal }) {
  const url = "http://localhost:5000";
  return (
    <section className='z-10 flex items-center justify-center mx-auto  px-10 bg-black fixed top-0 left-0 w-screen h-screen'>
      <MdClose
        onClick={() => setOpenModal(false)}
        className='absolute right-10 top-10 text-3xl'
      ></MdClose>
      {videoLoading ? (
        <Loading small={false} />
      ) : (
        <video className='sm:11/12 xl:w-2/4 aspect-auto bg-black ' controls>
          <source src={`${url}${video}`} type='video/mp4' />
          no video
        </video>
      )}
    </section>
  );
}

export default ShowVideo;
