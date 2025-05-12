import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useRef } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "@/app/contextApi";
import { defaultColor, darkModeColor } from "@/colors";

type TimeValue = {
  text: string;
  isSelected: boolean;
};

export function TimerPicker({
  onSaveTime,
}: {
  onSaveTime: (timeValue: string) => void;
}) {
  const { darkModeObject, openTimePickerObject } = useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;
  const { openTimePickerWindow, setOpenTimePickerWindow } =
    openTimePickerObject;

  const [timeValues, setTimeValues] = useState<TimeValue[]>([
    { text: "11", isSelected: true },
    { text: "12", isSelected: false },
  ]);

  const [meridian, setMeridian] = useState([
    { text: "AM", isSelected: true },
    { text: "PM", isSelected: false },
  ]);

  const hoursRef = useRef<HTMLInputElement>(null);
  const minutesRef = useRef<HTMLInputElement>(null);

  //   update meridian variable

  function updateMeridianFx(clickedIndex: number) {
    const updateMeridian = meridian.map((singleMeridian, index) => {
      if (index === clickedIndex) {
        return { ...singleMeridian, isSelected: true };
      }

      return { ...singleMeridian, isSelected: false };
    });

    setMeridian(updateMeridian);
  }

  //   update meridian variable

  function updateTimeValues(clickedIndex: number) {
    const updateTimeValues = timeValues.map((singleTimeValue, index) => {
      if (index === clickedIndex) {
        return { ...singleTimeValue, isSelected: true };
      }

      return { ...singleTimeValue, isSelected: false };
    });

    setTimeValues(updateTimeValues);
  }

  function updateTimeValuesText(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const timeValuesCopy = [...timeValues];
    const currentText = event.target.value;
    const parsedValue = parseInt(currentText, 10);

    const isNumeric = /^\d*$/.test(currentText);

    function isValidInput(
      currentText: string,
      parsedValue: number,
      index: number
    ) {
      if (
        (index === 0 &&
          currentText.length <= 2 &&
          parsedValue >= 0 &&
          parsedValue <= 12) ||
        (index === 1 &&
          currentText.length <= 2 &&
          parsedValue >= 0 &&
          parsedValue <= 59) ||
        currentText === ""
      ) {
        return true;
      }
      return false;
    }

    if (isNumeric && isValidInput(currentText, parsedValue, index)) {
      timeValuesCopy[index].text = currentText;
      setTimeValues(timeValuesCopy);
    }
  }

  // handle the exit of each input
  function handleOnBlur(index: number) {
    const timesValuesCopy = [...timeValues];
    const currentText = timesValuesCopy[index].text;

    if (currentText === "") {
      timesValuesCopy[index].text = "00";
    } else if (currentText.length === 1) {
      timesValuesCopy[index].text = "0" + currentText;
    }

    setTimeValues(timesValuesCopy);
  }

  //   save the time in a formatted text
  function saveTime() {
    const meridianSelected = meridian.filter(
      (singleMeridian) => singleMeridian.isSelected
    )[0].text;

    const selectedTimeFormatted =
      timeValues[0].text + ":" + timeValues[1].text + " " + meridianSelected;

    onSaveTime(selectedTimeFormatted);
    setOpenTimePickerWindow(false);
  }

  //   UseEffect hooks
  useEffect(() => {
    if (openTimePickerWindow) {
      if (timeValues[0].isSelected) {
        hoursRef.current?.focus();
      } else if (timeValues[1].isSelected) {
        minutesRef.current?.focus();
      }
    }
  }, [openTimePickerWindow]);

  useEffect(() => {
    function getCurrentTime() {
      const now = new Date();
      let currentHour = now.getHours();
      const currentMinutes = now.getMinutes().toString().padStart(2, "0");
      const AmPm = currentHour >= 12 ? "PM" : "AM";

      // convert hours from 24-hour format to 12-hour format
      currentHour = currentHour % 12;
      currentHour = currentHour ? currentHour : 12;
      const formattedHour = currentHour.toString().padStart(2, "0");

      // update the timeValues
      const timeValuesCopy = [...timeValues];
      timeValuesCopy[0].text = formattedHour;
      timeValuesCopy[1].text = currentMinutes;
      setTimeValues(timeValuesCopy);

      const copyMeridian = meridian.map((singleMeridian) => {
        if (singleMeridian.text === AmPm) {
          return { ...singleMeridian, isSelected: true };
        }
        return { ...singleMeridian, isSelected: false };
      });

      setMeridian(copyMeridian);
    }
    getCurrentTime();
  }, [openTimePickerWindow]);

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
            value={timeValues[0].text}
            onClick={() => {
              updateTimeValues(0);
            }}
            ref={hoursRef}
            onChange={(event) => updateTimeValuesText(event, 0)}
            onBlur={() => handleOnBlur(0)}
            readOnly={!timeValues[0].isSelected}
            style={{
              backgroundColor: timeValues[0].isSelected
                ? defaultColor[100]
                : defaultColor.backgroundSlate,
              color: timeValues[0].isSelected
                ? defaultColor[100]
                : defaultColor.grey,
            }}
            className="w-[100px] text-[45px] p-4 rounded-md text-center outline-none"
          />

          <span className="text-2xl font-bold"> : </span>

          {/* minutes fields */}
          <input
            value={timeValues[1].text}
            onClick={() => {
              updateTimeValues(1);
            }}
            ref={minutesRef}
            onChange={(event) => updateTimeValuesText(event, 1)}
            onBlur={() => handleOnBlur(1)}
            readOnly={!timeValues[1].isSelected}
            style={{
              backgroundColor: timeValues[1].isSelected
                ? defaultColor[100]
                : defaultColor.backgroundSlate,
              color: timeValues[0].isSelected
                ? defaultColor[100]
                : defaultColor.grey,
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
      <button
        onClick={saveTime}
        className="bg-blue-600 p-3 text-white w-full rounded-md mt-10 mb-1"
      >
        Save
      </button>
    </div>
  );
}
