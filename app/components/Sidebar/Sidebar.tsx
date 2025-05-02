import React, { useEffect, useRef } from "react";
import LogoAndName from "../LogoaAndName";
import MenuSelection from "./MenuSelection";
import LogoutSelection from "./LogoutSelection";
import { useGlobalContextProvider } from "@/app/contextApi";
import { darkModeColor, defaultColor } from "@/colors";

const Sidebar = () => {
  const { openSideBarObject, darkModeObject } = useGlobalContextProvider();
  const { openSideBar, setOpenSideBar } = openSideBarObject;
  const { isDarkMode } = darkModeObject;
  const sideBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!sideBarRef.current?.contains(event.target as Node)) {
        setOpenSideBar(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [openSideBar]);

  return (
    <div
      style={{
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
      }}
      ref={sideBarRef}
      className={`${!openSideBar ? "max-xl:hidden" : "fixed shadow-lg"}
    flex-grow z-50 p-10 flex-col bg-white min-h-screen transition-all`}
    >
      <LogoAndName />
      <MenuSelection />
      <LogoutSelection />
    </div>
  );
};

export default Sidebar;
