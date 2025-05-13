import React, { useEffect } from "react";
import { defaultColor } from "@/colors";
import { useGlobalContextProvider } from "@/app/contextApi";
import { HabitType } from "@/app/Types/GlobalTypes";
import { getCurrentDayName } from "@/app/utils/allHabitUtils/DateFunctions";
import HabitEmptyPlaceHolder from "@/app/EmptyPlaceholders/HabitEmptyPlaceHolder";
import { SuccessIcon } from "@/app/Assets/SuccessIcon";
import { HabitCard } from "../SingleHabitCard";

export default function HabitContainerMiddle() {
  const {
    allHabitsObject,
    selectedAreaStringObject,
    selectedCurrentDayObject,
    allFilteredHabitsObject,
    // openDropDownObject,
  } = useGlobalContextProvider();
  const { allHabits } = allHabitsObject;
  const { allFilteredHabits, setAllFilteredHabits } = allFilteredHabitsObject;
  const { selectedAreaString } = selectedAreaStringObject;
  const { selectedCurrentDate } = selectedCurrentDayObject;
  // const { openDropdown } = openDropDownObject;

  useEffect(() => {
    const getTwoFirstDayLetter = getCurrentDayName(selectedCurrentDate).slice(
      0,
      2
    );

    let filteredHabitByArea: HabitType[] = [];
    // filter habits based on frequency
    const filteredHabitsByFrequency = allHabits.filter((singleHabit) => {
      return singleHabit.frequency[0].days.some(
        (day) => day === getTwoFirstDayLetter
      );
    });

    if (selectedAreaString !== "All") {
      filteredHabitByArea = filteredHabitsByFrequency.filter((habit) =>
        habit.areas.some((area) => area.name === selectedAreaString)
      );
    } else {
      filteredHabitByArea = filteredHabitsByFrequency;
    }

    // set the filtered habits state
    setAllFilteredHabits(filteredHabitByArea);
  }, [selectedCurrentDate, allHabits, selectedAreaString]);

  // check if all habits for the selected date are completed
  const isAllHabitsCompleted =
    allFilteredHabits.length > 0 &&
    allFilteredHabits.every((habit) => {
      return habit.completedDays.some(
        (day) => day.date === selectedCurrentDate
      );
    });

  return (
    <div className="p-3">
      {allFilteredHabits.length === 0 ? (
        <HabitEmptyPlaceHolder />
      ) : (
        <>
          {isAllHabitsCompleted && (
            <div className="flex justify-center items-center p-5 flex-col">
              <SuccessIcon color={defaultColor.textColor} />
              <span className="text-[13px] text-gray-400 text-center mt-6 ">
                {`Great job! You've completed all your habits for today`}
              </span>
            </div>
          )}
          {allFilteredHabits.map((singleHabit, singleHabitIndex) => (
            <div key={singleHabitIndex}>
              {singleHabit.completedDays.some(
                (day) => day.date === selectedCurrentDate
              ) === false && <HabitCard singleHabit={singleHabit} />}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
