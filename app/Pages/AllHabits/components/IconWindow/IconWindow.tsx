/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { iconData } from "./IconData";
import { useGlobalContextProvider } from "@/app/contextApi";

function IconsWindow() {
  const [allIcons, setAllIcons] = useState(iconData);
  const { darkModeObject, openIconWindowObject } = useGlobalContextProvider();
  const { openIconWindow, setOpenIconWindow, setIconSelected } =
    openIconWindowObject;
  const { isDarkMode } = darkModeObject;

  function handleIconSelection(iconIndex: number) {
    const updatedAllIcons = allIcons.map((singleIcon, index) => {
      if (index === iconIndex) {
        setIconSelected(singleIcon.faIcon);
        return { ...singleIcon, isSelected: true };
      }

      return { ...singleIcon, isSelected: false };
    });

    setAllIcons(updatedAllIcons);
    setOpenIconWindow(false);
  }

  return (
    <div
      className={` w-full left-0 flex   absolute justify-center items-center top-52 ${
        openIconWindow ? "flex" : "hidden"
      }`}
    >
      <div
        className={` relative z-50 w-[400px] p-4 rounded-md border flex flex-col gap-6 shadow-md ${
          isDarkMode ? "bg-blackColorDark text-white" : "bg-white text-black"
        }`}
      >
        <FontAwesomeIcon
          onClick={() => setOpenIconWindow(false)}
          className={`absolute top-8 right-4 text-gray300 cursor-pointer`}
          icon={faClose}
          height={20}
          width={20}
        />
      </div>

      <span className="font-bold text-lg bg-transparent mt-3 ">
        Choose Your Icon
      </span>
      <div className="border border-gray-200 p-5 flex flex-wrap gap-4 items-center rounded-md mb-5">
        {allIcons.map((icon, iconIndex) => (
          <FontAwesomeIcon
            key={iconIndex}
            className={`border p-2 border-gray-200 rounded-md text-xl cursor-pointer hover:text-blue-500 hover:border-blue-500`}
            icon={icon.faIcon}
            width={50}
            height={50}
            onClick={() => {
              handleIconSelection(iconIndex);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default IconsWindow;
