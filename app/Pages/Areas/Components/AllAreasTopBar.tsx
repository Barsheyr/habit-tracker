import React from "react";
import { useGlobalContextProvider } from "@/app/contextApi";
import { darkModeColor, defaultColor } from "@/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Button from "@/app/Button";

const AllAreasTopBar = () => {
  const {
    openSideBarObject: { setOpenSideBar },
    darkModeObject: { isDarkMode },
    openAreaFormObject: { setOpenAreaForm },
  } = useGlobalContextProvider();
  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
        color: isDarkMode ? darkModeColor.textColor : "black",
      }}
      className="p-6 rounded-md flex justify-between items-center transition-all"
    >
      <div className="flex gap-5 items-center">
        <span className="text-xl font-bold"> Areas </span>
        <Button
          style={{
            backgroundColor: darkModeColor.background,
          }}
          className="text-white p-2 px-4 ml-3"
          size="small"
          icon="plus"
          onClick={() => setOpenAreaForm(true)}
        >
          Add Area
        </Button>
      </div>
      <FontAwesomeIcon
        icon={faBars}
        onClick={() => setOpenSideBar(true)}
        className="m-2 max-xl:flex hidden mt-[13px] cursor-pointer"
      />
    </div>
  );
};

export default AllAreasTopBar;
