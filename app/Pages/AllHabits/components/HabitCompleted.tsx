import React from "react";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import MoreVert from "@mui/icons-material/MoreVert";

const HabitCompleted = () => {
  return (
    <div className="bg-white mt-7 p-8 rounded-md">
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
  return (
    <div
      className="flex p-3 items-center justify-between
    "
    >
      <Checkbox
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
      />
    </div>
  );
}
