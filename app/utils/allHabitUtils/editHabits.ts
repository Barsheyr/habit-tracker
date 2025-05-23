import { iconToText } from "@/app/Pages/AllHabits/components/IconWindow/IconData";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { HabitType, AreaType } from "@/app/Types/GlobalTypes";
import toast from "react-hot-toast";

export default function convertIconsToTextOfHabits(habit: HabitType) {
  const { icon, areas } = habit;

  // convert the icon to text and store it in the habit
  const habitIconText = iconToText(icon as IconProp);

  // Convert the icons
  const areasCopy = areas.map((area) => ({
    ...area,
    icon: iconToText(area.icon as IconProp),
  }));

  const updatedHabit = { ...habit, icon: habitIconText, areas: areasCopy };

  return updatedHabit;
}
export async function editHabit({
  allHabits,
  setAllHabits,
  selectedItems,
  habit,
}: {
  allHabits: HabitType[];
  setAllHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
  selectedItems: AreaType | HabitType | null;
  habit: HabitType;
}) {
  try {
    const currentHabitSelected = selectedItems as HabitType;
    // find the habit in the all habits array
    const findTheHabit = allHabits.findIndex(
      (singleHabit) => singleHabit._id === currentHabitSelected._id
    );
    // create a shallow copy of the habit array
    const copyAllHabits = [...allHabits];
    // update the habits array
    copyAllHabits[findTheHabit] = habit;

    // convert the icon from IconProp to string
    //
    //Extract the icon and the areas from the habit
    const { icon, areas } = habit;

    // convert the icon to text ans store
    const habitIconText = iconToText(icon as IconProp);

    // convert the icons in the areas array
    const areasCopy = areas.map((area) => ({
      ...areas,
      icon: iconToText(area.icon as IconProp),
    }));

    //update the icon and the areas in the habits

    const updatedHabit = { ...habit, icon: habitIconText, areas: areasCopy };
    console.log(currentHabitSelected._id);

    // use the fetch method to update

    const response = await fetch(
      `/api/habits?habitId=${currentHabitSelected._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: updatedHabit.name,
          icon: updatedHabit.icon,
          frequency: updatedHabit.frequency,
          notificationTime: updatedHabit.notificationTime,
          isNotificationOn: updatedHabit.isNotificationOn,
          areas: updatedHabit.areas,
          completedDays: updatedHabit.completedDays,
        }),
      }
    );
    if (!response.ok) {
      // Handle non-200
      const errorData = await response.json();
      toast.error(errorData.message || "Something went wrong");
      return;
    }

    const data = await response.json();

    setAllHabits(copyAllHabits);
    toast.success("Habit has been updated successfully");
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
}
