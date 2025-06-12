import React from "react";

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-16 mt-24 gap-10">
      <h1 className="text-4xl sm:text-7xl font-bold leading-tight">
        Build better habits. <span className="text-blue-600">Every day.</span>
      </h1>

      <p className="text-xl sm:4xl max-w-md sm:max-w-2xl">
        Stay consistent, stay motivated. Our simple habit tracker helps you take
        charge of your routine and turn goals into progress — one step at a
        time.
      </p>

      <button
        className="mt-4 text-sm sm:text-base font-medium rounded-full px-8 py-3 bg-blue-600 text-white hover:bg-blue-700 transition"
        type="button"
      >
        Start Tracking Now
      </button>
    </section>
  );
};

export default HeroSection;
