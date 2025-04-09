import React from "react";
import { faCode, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HabitContainerTop = () => {
  return (
    <div className="p-3 flex flex-row justify-between items-center">
      <div className="flex justify-between gap-4 items-center">
        <div>
          <h2 className="font-bold text-lg"> Sunday </h2>
          <span className="font-light text-[12px]"> 17 May 2024 </span>
        </div>
        {/* . */}
        <div className="flex gap-1 ml-4">
          <div className="bg-blue-500 rounded-full cursor-pointer">
            <FontAwesomeIcon
              height={20}
              width={20}
              icon={faArrowLeft}
              className="text-white"
            />
          </div>
          <div className="bg-blue-500 rounded-full cursor-pointer">
            <FontAwesomeIcon
              height={20}
              width={20}
              icon={faArrowRight}
              className="text-white"
            />
          </div>
        </div>
      </div>

      {/* . */}

      <button className="bg-blue-500 text-white p-3 flex gap-2 items-center rounded-md text-sm">
        <FontAwesomeIcon icon={faPlus} />
        <span> New Habit </span>
      </button>
    </div>
  );
};

export default HabitContainerTop;
