import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "@/app/contextApi";
import { defaultColor, darkModeColor } from "@/colors";

export function TimerPicker() {
  const { darkModeObject, openTimePickerObject } = useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;
  const { openTimePickerWindow, setOpenTimePickerWindow } =
    openTimePickerObject;

  const [timeValue, setTimeValue] = useState([
    { text: "11", isSelected: true },
    { text: "12", isSelected: false },
  ]);

  const [meridian, setMeridian] = useState([
    { text: "AM", isSelected: true },
    { text: "PM", isSelected: false },
  ]);

  function updateMeridianFx(clickedIndex: number) {
    const updateMeridian = meridian.map((singleMeridian, index) => {
      if (index === clickedIndex) {
        return { ...singleMeridian, isSelected: true };
      }

      return { ...singleMeridian, isSelected: false };
    });

    setMeridian(updateMeridian);
  }

  return (
    <div
      className={`bg-white w-[413px] top-[89px] left-1/2 transform -translate-x-1/2 z-50 p-7 rounded-md shadow-md ${
        openTimePickerWindow ? "absolute" : "hidden"
      }`}
    >
      {/* select the closing icon  */}
      <span className="font-bold flex justify-between items-center">
        {/* select time */}
        <span> Select Time </span>

        {/* closing icons */}
        <FontAwesomeIcon
          height={20}
          width={20}
          className={`top-8 right-4 text-gray-300 cursor-pointer `}
          onClick={() => setOpenTimePickerWindow(false)}
          icon={faClose}
        />
      </span>
      {/* -------------------------------------- */}
      {/* Input fields */}
      <div className="flex gap-8 mt-9">
        <div className="flex gap-2 justify-center items-center">
          {/* Hours Field */}
          <input
            value={timeValue[0].text}
            style={{
              backgroundColor: timeValue[0].isSelected
                ? defaultColor[100]
                : defaultColor.backgroundSlate,
              color: timeValue[0].isSelected
                ? defaultColor[100]
                : defaultColor.grey,
            }}
            className="w-[100px] text-[45px] p-4 rounded-md text-center outline-none"
          />

          <span className="text-2xl font-bold"> : </span>

          {/* minutes fields */}
          <input
            style={{
              backgroundColor: defaultColor.backgroundSlate,
              color: defaultColor.textColor,
            }}
            className="w-[100px] text-[45px] p-4 rounded-md text-center outline-none"
          />
        </div>
        {/* --------------------------------------- */}
        {/* AM AND PM OPTIONS */}
        <div>
          {meridian.map((singleMeridian, index) => (
            <span
              key={index}
              onClick={() => updateMeridianFx(index)}
              style={{
                color: singleMeridian.isSelected
                  ? defaultColor.background
                  : darkModeColor.textColor,
                backgroundColor: singleMeridian.isSelected
                  ? defaultColor.default
                  : defaultColor[100],
              }}
              className="p-2 px-3 rounded-md text-white cursor-pointer"
            >
              {singleMeridian.text}
            </span>
          ))}
        </div>
      </div>
      <button className="bg-blue-500 text-white w-full rounded-full mt-10 mb-1">
        Save
      </button>
    </div>
  );
}
