import React from "react";
import HabitContainerTop from "./HabitsContainer/HabitContainerTop";
import HabitContainerMiddle from "./HabitsContainer/HabitContainerMiddle";
import HabitCompleted from "./HabitCompleted";

const HabitsContainer = () => {
  return (
    <div className="mt-5 bg-white rounded-md p-5 h-[500px] flex flex-col gap-3">
      <HabitContainerTop />
      <HabitContainerMiddle />
    </div>
  );
};

export default HabitsContainer;
