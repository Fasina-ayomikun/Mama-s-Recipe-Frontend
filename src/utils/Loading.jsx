import React from "react";

function Loading({ small }) {
  return (
    <section
      className={`bg-white ${
        small
          ? "h-full grid place-content-center"
          : "h-screen grid place-content-center"
      }`}
    >
      <div className='w-24 aspect-square mx-auto  my-10  bg-transparent border-zinc-800 border-4 border-t-dark-green rounded-full animate-spin '></div>
    </section>
  );
}

export default Loading;
