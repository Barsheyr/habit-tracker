import { HabitType } from "@/app/Types/GlobalTypes";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

export function addNewHabit({
  allHabits,
  setAllHabits,
  newHabit,
}: {
  allHabits: HabitType[];
  setAllHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
  newHabit: HabitType;
}) {
  try {
    setAllHabits([...allHabits, newHabit]);
    toast.success("Habit add successfully!");
  } catch (error) {
    console.error(error); // Now it's used
    toast.error("Something went wrong!...");
  }
}
