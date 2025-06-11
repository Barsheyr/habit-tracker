import { HabitType } from "@/app/Types/GlobalTypes";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { iconToText } from "@/app/Pages/AllHabits/components/IconWindow/IconData";
import toast from "react-hot-toast";
import scheduleNotifications from "../notificationFunctions";

export async function addNewHabit({
  allHabits,
  setAllHabits,
  habit,
}: {
  allHabits: HabitType[];
  setAllHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
  habit: Omit<HabitType, "_id">;
}) {
  const { icon, areas } = habit;

  // convert
  const habitIconText = iconToText(icon);

  // Make a a copy of the area array and convert icons to text
  const areaCopy = areas.map((area) => ({
    ...area,
    icon: iconToText(area.icon as IconProp),
  }));

  // create the updated habit object
  const updatedHabit = {
    ...habit,
    icon: habitIconText,
    areas: areaCopy,
  };

  try {
    const response = await fetch("/api/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(updatedHabit),
    });

    if (!response.ok) {
      throw new Error(`Failed to add habit`);
    }
    //extract
    const data = await response.json();
    // console.log("Habit POST response data:", data);

    // if (!data.habit) {
    //   throw new Error("No habit returned from server");
    // }

    const { _id } = data.habit;

    // update the _id from the response
    const updatedIdOfHabit = {
      ...habit,
      _id: _id,
      icon: habitIconText,
      areas: areaCopy,
    };

    // add the updated habit to the allHabits array
    setAllHabits([...allHabits, updatedIdOfHabit]);

    if (updatedIdOfHabit.isNotificationOn) {
      scheduleNotifications(
        updatedHabit.notificationTime,
        updatedHabit.frequency[0].days,
        updatedHabit.name
      );
    }
    toast.success("Habit add successfully!");
  } catch (error) {
    console.error(error); // Now it's used
    toast.error("Something went wrong!...");
    throw error;
  }
}
