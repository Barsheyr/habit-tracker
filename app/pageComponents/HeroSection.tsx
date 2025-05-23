import React from "react";

const HeroSection = () => {
  return (
    <div className="flex flex-col mx-16 items-center mt-[100px] gap-6">
      <div className="font-bold text-3xl text-center">
        Build the habits that <span className="text-blue-500"> matter! </span>
      </div>
      <p className="text-center text-sm sm:w-[430px] w-[370px]">
        feeling overwhelmed? Our easy-to-use habit tracker help you take control
        of your day and achieve your goals
      </p>
      <button
        className="text-sm font-light rounded-lg px-9 py-3 text-white transition bg-blue-500
          focus:outline-none"
        type="button"
      >
        {"Let's get started!"}
      </button>
    </div>
  );
};

export default HeroSection;
