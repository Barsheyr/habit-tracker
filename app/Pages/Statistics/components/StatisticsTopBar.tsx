import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "../../../contextApi";
import { darkModeColor } from "@/colors";

function StatisticsTopBar() {
  const { darkModeObject, openSideBarObject } = useGlobalContextProvider();
  const { setOpenSideBar } = openSideBarObject;
  const { isDarkMode } = darkModeObject;

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? darkModeColor.background : "white",
        color: isDarkMode ? darkModeColor.textColor : "white",
      }}
      className="p-6 rounded-md flex justify-between items-center transition-all"
    >
      <div>
        <span className="text-xl font-bold text-blue-500"> Statistics </span>
      </div>
      <FontAwesomeIcon
        onClick={() => setOpenSideBar(true)}
        className="m-2 max-xl:flex hidden mt-[13px] cursor-pointer text-black"
        icon={faBars}
      />
    </div>
  );
}

export default StatisticsTopBar;
