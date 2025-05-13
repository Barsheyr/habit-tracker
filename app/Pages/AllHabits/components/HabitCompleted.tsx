import React from "react";
import { darkModeColor, defaultColor } from "@/colors";
import { useGlobalContextProvider } from "@/app/contextApi";
import { HabitCard } from "./SingleHabitCard";

const HabitCompleted = () => {
  const { darkModeObject, allFilteredHabitsObject, selectedCurrentDayObject } =
    useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;
  const { allFilteredHabits } = allFilteredHabitsObject;
  const { selectedCurrentDate } = selectedCurrentDayObject;

  const areaAllHabitsNotCompleted = allFilteredHabits.every((singleHabit) => {
    return !singleHabit.completedDays.some(
      (day) => day.date === selectedCurrentDate
    );
  });

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
        <div className="mt-10 flex items-center justify-center w-full">
          {areaAllHabitsNotCompleted && (
            <p className="text-lg text-gray-400 w-72 text-center ">
              Habit stacking is like a superpower! Do not let it go to waste
            </p>
          )}
        </div>
        {allFilteredHabits.map((singleHabit, index) => (
          <div key={index}>
            {singleHabit.completedDays.some(
              (day) => day.date === selectedCurrentDate
            ) === true && <HabitCard singleHabit={singleHabit} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitCompleted;
