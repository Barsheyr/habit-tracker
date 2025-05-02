import React from "react";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { darkModeColor, defaultColor } from "@/colors";
import { useGlobalContextProvider } from "@/app/contextApi";

const HabitCompleted = () => {
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
      className="mt-7 p-8 rounded-md"
    >
      <span className="font-bold text-lg mb-2"> Habits Completed </span>
      <div className="mt-4 opacity-50">
        <HabitCard />
        <HabitCard />
        <HabitCard />
      </div>
    </div>
  );
};

export default HabitCompleted;

function HabitCard() {
  const { darkModeObject } = useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;

  return (
    <div className="flex p-3 items-center justify-between">
      {/* checkbox */}
      <Checkbox
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        sx={{
          color: defaultColor.circleCheckbox,
          "&.Mui-checked": {
            color: defaultColor.circleCheckbox,
          },
        }}
      />
      <div
        style={{
          color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
          backgroundColor: isDarkMode
            ? darkModeColor.background
            : defaultColor.background,
        }}
        className="flex justify-between gap-2 w-full p-3 py-4 rounded-md bg-slate-50"
      >
        <div className="w-full">
          {/* . */}
          <div className="flex gap-2 justify-between">
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon
                className="p-3 rounded-full h-4 w-4 bg-blue-500 text-white"
                icon={faCode}
                height={20}
                width={20}
              />
              <span className=""> Coding </span>
            </div>
          </div>
          {/* . */}
          <div className="flex gap-2 mt-2">
            <div
              style={{
                color: isDarkMode
                  ? darkModeColor.textColor
                  : defaultColor.default,
                backgroundColor: isDarkMode
                  ? defaultColor[50]
                  : defaultColor[100],
              }}
              className="p-1 text-white bg-blue-500 text-[12px] rounded-md px-2"
            >
              <span> Area1 </span>
            </div>
            <div
              style={{
                color: isDarkMode
                  ? darkModeColor.textColor
                  : defaultColor.default,
                backgroundColor: isDarkMode
                  ? defaultColor[50]
                  : defaultColor[100],
              }}
              className="p-1 text-white bg-blue-500 text-[12px] rounded-md px-2"
            >
              <span> Area2 </span>
            </div>
          </div>
        </div>
        {/* button */}
        <div className="w-10 flex items-center justify-center">
          <IconButton>
            <MoreVertIcon sx={{ color: isDarkMode ? "white" : "gray" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
