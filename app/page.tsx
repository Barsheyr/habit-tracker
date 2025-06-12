import React from "react";
import HeroSection from "./pageComponents/HeroSection";
import Navbar from "./pageComponents/Navbar";

const page = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default page;
