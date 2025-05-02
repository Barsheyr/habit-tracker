import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useGlobalContextProvider } from "@/app/contextApi";
import { useState, useEffect } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { darkModeColor, defaultColor } from "@/colors";

const DarkMode = () => {
  const { darkModeObject } = useGlobalContextProvider();
  const { isDarkMode, setDarkMode, darkModeItems, setDarkModeItems } =
    darkModeObject;

  function handleClickedItem(singleItemIndex: number) {
    const updateDarkModeItems = darkModeItems.map((darkModeItem, index) => {
      if (singleItemIndex == index) {
        return { ...darkModeItem, isSelected: true };
      }

      return { ...darkModeItem, isSelected: false };
    });
    setDarkModeItems(updateDarkModeItems);
  }

  useEffect(() => {
    darkModeItems.forEach((singleItem) => {
      if (singleItem.id === 1 && singleItem.isSelected) {
        setDarkMode(false);
      }

      if (singleItem.id === 2 && singleItem.isSelected) {
        setDarkMode(true);
      }
    });
  }, [darkModeItems, setDarkMode]);

  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.backgroundSlate
          : defaultColor.background,
      }}
      className="bg-slate-50 w-[90px] relative rounded-3xl flex"
    >
      {darkModeItems.map((singleItem, singleItemIndex) => (
        <div
          key={singleItemIndex}
          onClick={() => handleClickedItem(singleItemIndex)}
          className="h-full w-[40px] z-40 flex justify-center items-center"
        >
          <FontAwesomeIcon
            className={`${
              singleItem.isSelected
                ? "bg-blue-500 rounded-full p-2"
                : "text-gray-300"
            }`}
            height={20}
            width={20}
            icon={singleItem.icon}
          />
        </div>
      ))}
      <div className="flex justify-center items-center h-full z-40"></div>

      <div
        className={`w-[38px] absolute h-[38px] top-1 transform ${
          isDarkMode ? "translate-x-[48px]" : "translate-x-1"
        } 
      rounded-full bg-white transition-all `}
      ></div>
    </div>
  );
};

export default DarkMode;
