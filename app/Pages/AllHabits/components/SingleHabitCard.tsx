import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, IconButton } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useGlobalContextProvider } from "@/app/contextApi";
import { HabitType } from "@/app/Types/GlobalTypes";
import { darkModeColor, defaultColor } from "@/colors";
import { v4 as uuidv4 } from "uuid";

export function HabitCard({ singleHabit }: { singleHabit: HabitType }) {
  const {
    darkModeObject,
    allHabitsObject,
    selectedCurrentDayObject,
    openDropDownObject,
    dropDownPositionObject,
    selectedItemsObject,
  } = useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;
  const { allHabits, setAllHabits } = allHabitsObject;
  const { selectedCurrentDate } = selectedCurrentDayObject;
  const { setOpenDropdown } = openDropDownObject;
  const { setDropDownPositions } = dropDownPositionObject;
  const { setSelectedItems } = selectedItemsObject;

  const [checked, setChecked] = useState(
    singleHabit.completedDays.some((day) => day.date === selectedCurrentDate)
  );

  function handleClickedCheckbox(event: React.ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;
    setChecked(checked);

    if (checked) {
      checkHabit();
    } else {
      uncheckedTheHabit();
    }
  }

  function checkHabit() {
    const completedDay = {
      _id: uuidv4(),
      date: selectedCurrentDate,
    };

    const updatedHabits: HabitType = {
      ...singleHabit,
      completedDays: [...singleHabit.completedDays, completedDay],
    };

    // update the habits state
    const updateAllHabits: HabitType[] = allHabits.map((habit) => {
      if (habit._id === updatedHabits._id) {
        return updatedHabits;
      } else {
        return habit;
      }
    });
    setAllHabits(updateAllHabits);
  }

  function uncheckedTheHabit() {
    const updatedHabits: HabitType = {
      ...singleHabit,
      completedDays: singleHabit.completedDays.filter(
        (day) => day.date !== selectedCurrentDate
      ),
    };

    const updateAllHabits: HabitType[] = allHabits.map((habit) => {
      if (habit._id === updatedHabits._id) {
        return updatedHabits;
      } else {
        return habit;
      }
    });
    setAllHabits(updateAllHabits);
  }

  function handleClickedThreeDots(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const top = rect.top;
    const left = rect.left;
    setDropDownPositions({ top, left });

    event.stopPropagation();
    setOpenDropdown(true);
    // select the single habit
    setSelectedItems(singleHabit);
  }

  useEffect(() => {
    const isCompleted = singleHabit.completedDays.some(
      (day) => day.date === selectedCurrentDate
    );
    setChecked(isCompleted);
  }, [singleHabit, selectedCurrentDate, allHabits]);

  return (
    <div className="flex p-3 items-center justify-between">
      {/* checkbox */}
      <Checkbox
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<CheckCircleIcon />}
        checked={checked}
        onChange={handleClickedCheckbox}
        sx={{
          color: defaultColor.circleCheckbox,
          "&.Mui-checked": {
            color: defaultColor.circleCheckbox,
          },
        }}
      />
      <div
        style={{
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
                icon={singleHabit.icon}
                height={20}
                width={20}
              />
              <span className=""> {singleHabit.name} </span>
            </div>
          </div>
          {/* . */}
          <div className="flex gap-2 mt-2">
            {singleHabit.areas.map((singleArea, index) => (
              <div
                key={index}
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
                <span> {singleArea.name} </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* button */}
      <div className="w-10 flex items-center justify-center">
        <IconButton onClick={handleClickedThreeDots}>
          <MoreVertIcon sx={{ color: isDarkMode ? "white" : "gray" }} />
        </IconButton>
      </div>
    </div>
  );
}
