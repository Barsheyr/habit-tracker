import React from "react";
import AllHabitsTopBar from "./components/AllHabitsTopBar";
import AllHabitsRightSideBar from "./components/AllHabitsRightSideBar";
import HabitsContainer from "./components/HabitsContainer";
import HabitCompleted from "./components/HabitCompleted";
import HabitWindow from "./components/HabitWindow";
import { Toaster } from "react-hot-toast";
import AreaContainer from "./components/AreaContainer";

const AllHabits = () => {
  return (
    <div className="max-lg:flex-col w-full flex flex-row gap-0 relative">
      <Toaster />
      <HabitWindow />
      <div className="flex-col flex-grow m-3">
        <AllHabitsTopBar />
        <AreaContainer />
        <HabitsContainer />
        <HabitCompleted />
      </div>

      <AllHabitsRightSideBar />
    </div>
  );
};

export default AllHabits;
