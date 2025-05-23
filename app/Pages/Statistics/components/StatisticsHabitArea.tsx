import React from "react";
import { useGlobalContextProvider } from "../../../contextApi";
import { darkModeColor } from "@/colors";
import StatisticsHabitCard from "./StatisticsHabitCard";

const StatisticsHabitArea = () => {
  const {
    allHabitsObject: { allHabits },
    darkModeObject: { isDarkMode },
  } = useGlobalContextProvider();
  return (
    <div
      style={{
        backgroundColor: isDarkMode ? darkModeColor.background : "white",
      }}
      className="p-4 mt-4 rounded-md"
    >
      {allHabits.map((habit, index) => (
        <div key={index}>
          <StatisticsHabitCard habit={habit} />
        </div>
      ))}
    </div>
  );
};

export default StatisticsHabitArea;
