// import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useGlobalContextProvider } from "@/app/contextApi";
import { darkModeColor, defaultColor } from "@/colors";

const DarkMode = () => {
  const { darkModeObject } = useGlobalContextProvider();
  const { isDarkMode, setDarkMode, darkModeItems, setDarkModeItems } =
    darkModeObject;

  const handleClickedItem = (index: number) => {
    const updatedItems = darkModeItems.map((item, i) => ({
      ...item,
      isSelected: i === index,
    }));
    setDarkModeItems(updatedItems);
  };

  useEffect(() => {
    darkModeItems.forEach((item) => {
      if (item.id === 1 && item.isSelected) {
        setDarkMode(false);
      } else if (item.id === 2 && item.isSelected) {
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
      className="relative w-[90px] h-[40px] rounded-full flex items-center justify-between px-1"
    >
      {darkModeItems.map((item, index) => {
        const isSelected = item.isSelected;
        return (
          <div
            key={index}
            onClick={() => handleClickedItem(index)}
            className={`z-10 w-[38px] h-[38px] rounded-full flex items-center justify-center cursor-pointer ${
              isSelected ? "text-white" : "text-gray-400"
            }`}
          >
            <FontAwesomeIcon
              icon={item.icon}
              className="text-[16px]"
              style={{ pointerEvents: "none" }} // Prevent accidental double fire
            />
          </div>
        );
      })}

      {/* Sliding Blue Background */}
      <div
        className={`absolute top-1 left-1 w-[38px] h-[38px] rounded-full bg-blue-500 transition-transform duration-300 transform ${
          isDarkMode ? "translate-x-[48px]" : "translate-x-0"
        }`}
      />
    </div>
  );
};

export default DarkMode;
