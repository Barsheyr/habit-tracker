import { Dispatch, SetStateAction } from "react";
import { HabitType, AreaType } from "@/app/Types/GlobalTypes";
import toast from "react-hot-toast";

export function deleteHabit(
  allHabits: HabitType[],
  setAllHabits: Dispatch<SetStateAction<HabitType[]>>,
  selectedItems: AreaType | HabitType | null
) {
  try {
    const updateHabits: HabitType[] = allHabits.filter(
      (habit) => habit._id !== selectedItems?._id
    );
    setAllHabits(updateHabits);
    toast.success("Habit has been deleted successfully");
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
}
