import { iconToText } from "@/app/Pages/AllHabits/components/IconWindow/IconData";
import { AreaType, HabitType } from "@/app/Types/GlobalTypes";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

export async function deleteArea(
  selectedArea: AreaType,
  allAllAreas: AreaType[],
  setAllAreas: Dispatch<SetStateAction<AreaType[]>>
) {
  try {
    const updatedAreas: AreaType[] = allAllAreas.filter(
      (area) => area._id !== selectedArea?._id
    );

    // delete the selectedArea

    const updateAllHabits: HabitType[] = allHabits.map((habit) => {
      if (habit.areas.some((area) => area._id === selectedArea?._id)) {
        return {
          ...habit,
          areas: habit.areas.filter((area) => area._id !== selectedArea?._id),
        };
      } else {
        return habit;
      }
    });

    // convert all the icons
    const convertIconToTextOfAllHabits: HabitType[] = updateAllHabits.map(
      (habit) => {
        return {
          ...habit,
          icon: iconToText(habit.icon),
          areas: habit.areas.map((area) => ({
            ...area,
            icon: iconToText(area.icon),
          })),
        };
      }
    );

    convertIconToTextOfAllHabits.forEach((habit) => {
      updateHabitInMongoDB(habit);
    });

    const response = await fetch(`/api/areas`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ areaId: selectedArea?._id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData.message);
      return { success: false, message: errorData.message };
    }
    const data = await response.json();
    toast.success("Area has been deleted successfully");
    setAllAreas(updatedAreas);
    return { success: true, message: data.message };
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
}

async function updateHabitInMongoDB(habit: HabitType) {
  try {
    const response = await fetch(`/api/habits?habitId=${habit._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: habit.name,
        icon: habit.icon,
        frequency: habit.frequency,
        notificationTime: habit.notificationTime,
        isNotificationOn: habit.isNotificationOn,
        completedDays: habit.completedDays,
      }),
    });

    if (!response.ok) {
      // habit
      const errorData = await response.json();
      toast.error(errorData.message || "Something went wrong");
      return;
    }
  } catch (error) {
    console.error(error);
  }
}
