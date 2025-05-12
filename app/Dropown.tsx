import React, { useState, useEffect, useRef } from "react";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { darkModeColor, defaultColor } from "@/colors";
import { useGlobalContextProvider } from "@/app/contextApi";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface dropMenuItem {
  name: string;
  icon: IconProp;
}

function Dropdown() {
  const {
    darkModeObject,
    openDropDownObject,
    dropDownPositionObject,
    openConfirmationWindowObject,
  } = useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;
  const { openDropdown, setOpenDropdown } = openDropDownObject;
  const { dropDownPositions } = dropDownPositionObject;
  const { setOpenConfirmationWindow } = openConfirmationWindowObject;

  const ref = useRef<HTMLDivElement>(null);
  const dropDownMenuItems: dropMenuItem[] = [
    { name: "Edit", icon: faPencil },
    { name: "Remove", icon: faTrash },
  ];

  const [hover, setHover] = useState(false);
  const [indexHovered, setIndexHovered] = useState(0);

  function handleHoverChange(index: number, state: boolean) {
    setIndexHovered(index);
    setHover(state);
  }

  function handleClickOption(index: number) {
    switch (index) {
      case 0:
        console.log("edit");
        break;
      case 1:
        setOpenConfirmationWindow(true);
        setOpenDropdown(false);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (ref && !ref.current?.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [openDropdown]);

  return (
    <div
      style={{
        left: dropDownPositions.left - 135,
        top: dropDownPositions.top + 40,
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
      }}
      className={`p-3 w-40 fixed z-[60] shadow-md flex rounded-lg 
        flex-col gap-3 text-[11px] top-11 left-1/3 ${
          openDropdown ? "block" : "hidden"
        }`}
    >
      {dropDownMenuItems.map((menuItem, index) => (
        <div
          style={{
            backgroundColor:
              hover && index === indexHovered ? darkModeColor.background : "",
            color: hover && index === indexHovered ? "#ffffff" : "",
          }}
          className="flex gap-2 items-center rounded-md p-3 
          select-none cursor-pointer transition-all"
          key={index}
          onMouseEnter={() => handleHoverChange(index, true)}
          onMouseLeave={() => handleHoverChange(index, false)}
          onClick={() => handleClickOption(index)}
        >
          <FontAwesomeIcon
            style={{
              color:
                hover && index === indexHovered
                  ? "#ffffff"
                  : defaultColor.default,
            }}
            className="size-4"
            icon={menuItem.icon}
          />

          <div
            style={{
              color:
                hover && index === indexHovered
                  ? "#fffff"
                  : !isDarkMode
                  ? "black"
                  : "white",
            }}
            className=""
          >
            {menuItem.name}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dropdown;
