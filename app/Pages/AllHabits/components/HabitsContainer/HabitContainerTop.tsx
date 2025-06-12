import React, { useEffect } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContextProvider } from "@/app/contextApi";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";

import {
  getFormattedDate,
  getDateString,
  getCurrentDayName,
} from "@/app/utils/allHabitUtils/DateFunctions";

const HabitContainerTop = () => {
  const { habitWindowObject, selectedCurrentDayObject, offsetDayObject } =
    useGlobalContextProvider();
  const { setOpenHabitWindow } = habitWindowObject;
  const { selectedCurrentDate, setSelectedCurrentDate } =
    selectedCurrentDayObject;

  const { offsetDay, setOffsetDay } = offsetDayObject;

  type Option = "next" | "prev";
  function updateDate(option: Option) {
    if (option === "next") {
      setOffsetDay((prev) => prev + 1);
    }
    if (option === "prev") {
      setOffsetDay((prev) => prev - 1);
    }
  }

  useEffect(() => {
    console.log(offsetDay);

    setSelectedCurrentDate(getDateString(new Date(), offsetDay));
  }, [offsetDay]);

  return (
    <div className="p-3 flex flex-row justify-between items-center">
      <div className="flex justify-between gap-4 items-center">
        <div>
          <h2 className="font-bold text-lg">
            {getCurrentDayName(selectedCurrentDate)}
          </h2>
          <span className="font-light text-[12px]">
            {getFormattedDate(selectedCurrentDate)}
          </span>
        </div>
        {/* . */}
        <div className="flex gap-1 ml-4">
          <div
            onClick={() => updateDate("prev")}
            className="bg-blue-500 rounded-full cursor-pointer"
          >
            <FontAwesomeIcon
              height={20}
              width={20}
              icon={faArrowAltCircleLeft}
              className="text-white"
            />
          </div>
          <div
            onClick={() => updateDate("next")}
            className="bg-blue-500 rounded-full cursor-pointer"
          >
            <FontAwesomeIcon
              height={20}
              width={20}
              icon={faArrowAltCircleRight}
              className="text-white"
            />
          </div>
        </div>
      </div>
      {/* . */}
      <button
        onClick={() => setOpenHabitWindow(true)}
        className="bg-blue-500 text-white p-3 flex gap-2 items-center rounded-md text-sm cursor-pointer"
      >
        <FontAwesomeIcon icon={faPlus} />
        <span> New Habit </span>
      </button>
    </div>
  );
};

export default HabitContainerTop;
