import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const DarkMode = () => {
  return (
    <div className="bg-slate-50 w-[90px] relative rounded-3xl flex">
      <div className="flex justify-center items-center w-[45px] h-full z-40">
        <FontAwesomeIcon
          height={20}
          width={20}
          icon={faSun}
          className="text-blue-500"
        />
      </div>
      <div className="flex justify-center items-center w-[45px] h-full z-40 opacity-100">
        <FontAwesomeIcon
          height={20}
          width={20}
          icon={faMoon}
          className="text-gray-500"
        />
      </div>

      <div className="w-[38px] absolute h-[39px] top-1 left-[4px] rounded-full bg-white"></div>
    </div>
  );
};

export default DarkMode;
