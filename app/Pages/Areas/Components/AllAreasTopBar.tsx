import React from "react";
import { useGlobalContextProvider } from "@/app/contextApi";
import { darkModeColor } from "@/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const AllAreasTopBar = () => {
  const {
    openSideBarObject: { setOpenSideBar },
    darkModeObject: { isDarkMode },
  } = useGlobalContextProvider();
  return (
    <div
      style={{
        backgroundColor: isDarkMode ? darkModeColor.background : "white",
      }}
      className="p-6 rounded-md flex justify-between items-center transition-all"
    >
      <div>
        <span>Areas</span>

        <Button
          style={{
            backgroundColor: isDarkMode ? darkModeColor.background : "white",
          }}
          className="p-6 rounded-md flex justify-between items-center transition-all"
          size="small"
          icon="plus"
        >
          Add Area
        </Button>
      </div>
      <FontAwesomeIcon icon={faBars} onClick={() => setOpenSideBar(true)} />
    </div>
  );
};

export default AllAreasTopBar;
