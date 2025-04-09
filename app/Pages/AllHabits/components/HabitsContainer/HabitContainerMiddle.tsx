import React from "react";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, IconButton } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const HabitContainerMiddle = () => {
  return (
    <div className=" ">
      <HabitCard />
    </div>
  );
};

function HabitCard() {
  return (
    <div className="flex p-3 items-center justify-between border">
      {/* checkbox */}
      <Checkbox
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
      />
      <div className="flex justify-between gap-2 w-full p-3 py-4 rounded-md bg-slate-50">
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
            <div className="p-1 text-white bg-blue-500 text-[12px] rounded-md px-2">
              <span> Area1 </span>
            </div>
            <div className="p-1 text-white bg-blue-500 text-[12px] rounded-md px-2">
              <span> Area1 </span>
            </div>
          </div>
        </div>
        {/* button */}
        <div className="w-10 flex items-center justify-center">
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default HabitContainerMiddle;
