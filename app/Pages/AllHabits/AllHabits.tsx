import React from "react";
import { faMoon, faSearch, faSun } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AllHabitsTopBar from "./components/AllHabitsTopBar";
import AllHabitsRightSideBar from "./components/AllHabitsRightSideBar";
import AllHabitsSearchBar from "./components/AllHabitsSearchBar";
import HabitsContainer from "./components/HabitsContainer";
import HabitCompleted from "./components/HabitCompleted";

const AllHabits = () => {
  return (
    <div className="w-full flex">
      <div className="w-[80%] m-5">
        <AllHabitsTopBar />
        <HabitsContainer />
        <HabitCompleted />
      </div>

      <AllHabitsRightSideBar />
    </div>
  );
};

export default AllHabits;
