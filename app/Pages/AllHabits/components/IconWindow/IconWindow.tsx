"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faClose, faIcons } from "@fortawesome/free-solid-svg-icons";
import { iconData } from "./IconData";
import { useGlobalContextProvider } from "@/app/contextApi";
import { darkModeColor } from "@/colors";
// import { IconProp } from "@fortawesome/fontawesome-svg-core";

export function IconWindow({
  // openIconWindow,
  // setOpenIconWindow,
  // setIconSelected,
  setSelectedIcon,
}: {
  setSelectionIcon: (icon: any) => void;
  // openIconWindow: boolean;
  // setOpenIconWindow: React.Dispatch<React.SetStateAction<boolean>>;
  // iconSelected: IconProp;
  // setIconSelected: React.Dispatch<React.SetStateAction<IconProp>>;
}) {
  const [allIcons, setAllIcons] = useState(iconData);
  const { darkModeObject, iconBox, isDark } = useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;
  const { iconBox, setOpenIconBox } = iconBox;

  function handleIconSelection(iconIndex: number) {
    const updatedAllIcons = allIcons.map((singleIcon, index) => {
      if (index === iconIndex) {
        setSelectedIcon(singleIcon, faIcons);
        return { ...singleIcon, isSelected: true };
      }

      return { ...singleIcon, isSelected: false };
    });

    setAllIcons(updatedAllIcons);
    setOpenIconBox(false);
  }

  return (
    <div
      className={` w-full left-0 flex   absolute justify-center items-center top-52 ${
        openIconBox ? "flex" : "hidden"
      }`}
    >
      <div
        className={` relative z-50 w-[400px] p-4 rounded-md border flex flex-col gap-6 shadow-md ${
          isDark ? "bg-blackColorDark text-white" : "bg-white text-black"
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
              setIconSelected(icon.faIcon);
              setOpenIconWindow(false);
            }}
          />
        ))}
      </div>
    </div>
  );
}
