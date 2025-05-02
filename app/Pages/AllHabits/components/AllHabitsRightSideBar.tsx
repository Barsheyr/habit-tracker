import React from "react";
import UserProfile from "./RightSidebar/UserProfile";
import MainStatistics from "./RightSidebar/MainStatistics";
import Calender from "./RightSidebar/Calender";
import { defaultColor, darkModeColor } from "@/colors";
import { useGlobalContextProvider } from "@/app/contextApi";

const AllHabitsRightSideBar = () => {
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
      className="w-full lg:w-[30%] bg-white flex flex-col items-center mt-5 rounded-lg p-2"
    >
      <UserProfile />
      <MainStatistics />
      <Calender />
    </div>
  );
};

export default AllHabitsRightSideBar;
