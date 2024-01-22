import React from 'react'
import im from "../../../../src/assets/bgg.png";
import Logo from "../../../../src/icons/Logo";

const Connectify = () => {
  return (
    <div className="relative hidden  dark:bg-black dark:text-white lg:flex-1 lg:h-screen   w-full   lg:p-8 p-6 lg:flex justify-center items-center flex-col lg:rounded-br-[200px]">
    <h1 className="mb-3 text-bold flex justify-center items-center z-10">
      <Logo
        className="fill-black dark:fill-white text-7xl"
        size={"200%"}
      />
    </h1>
    <h3 className="lg:text-3xl text-justify font-display lg:block hidden z-10">
      Connectify Redefining the Way You Connect <br />
      and Share by Offering a Seamless, Intuitive, <br />
      and Personalized Environment.
    </h3>
    <img
      src={im}
      alt=""
      className="absolute opacity-30 "
      loading="lazy"
    />
  </div>
  )
}

export default Connectify
