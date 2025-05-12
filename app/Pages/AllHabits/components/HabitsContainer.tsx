import React from "react";
import HabitContainerTop from "./HabitsContainer/HabitContainerTop";
import HabitContainerMiddle from "./HabitsContainer/HabitContainerMiddle";
import { darkModeColor, defaultColor } from "@/colors";
import { useGlobalContextProvider } from "@/app/contextApi";

const HabitsContainer = () => {
  const { darkModeObject } = useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;

  return (
    <div
      style={{
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
      }}
      className="mt-5 bg-white rounded-md p-5 flex flex-col gap-3"
    >
      <HabitContainerTop />
      <HabitContainerMiddle />
    </div>
  );
};

export default HabitsContainer;
