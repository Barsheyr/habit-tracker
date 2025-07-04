import {
  faBorderAll,
  faChartSimple,
  faCheck,
  faChevronCircleRight,
  faFaceSmile,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { darkModeColor, defaultColor } from "@/colors";
// import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContextProvider } from "../../../contextApi";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CalendarHeatMap from "react-calendar-heatmap";
import { getCurrentDayName } from "@/app/utils/allHabitUtils/DateFunctions";
import { HabitType } from "@/app/Types/GlobalTypes";
import AllHabits from "../../AllHabits/AllHabits";

type StatisticsCard = {
  id: number;
  icon: IconProp;
  counter: number;
  text: string;
};

export default function StatisticsBoard() {
  const [statisticsCard, setStatisticsCard] = useState<StatisticsCard[]>([
    { id: 1, icon: faFaceSmile, counter: 5, text: "Total Habits" },
    { id: 2, icon: faBorderAll, counter: 3, text: "Total Perfect Days" },
    { id: 3, icon: faChartSimple, counter: 1.2, text: "Average Per Daily" },
    { id: 4, icon: faCheck, counter: 13, text: "Best Streak" },
  ]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {
    darkModeObject: { isDarkMode },
    allHabitsObject: { allHabits },
    selectedCurrentDayObject: { selectedCurrentDate },
  } = useGlobalContextProvider();

  const filteredStatisticsCard =
    windowWidth < 640
      ? statisticsCard.filter((card) => card.text !== "Average Per Daily")
      : statisticsCard;

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const dateCounts: { [key: string]: number } = {};

    //calculate the total number of completed Habits

    //extract
    allHabits.forEach((habit) => {
      habit.completedDays.forEach((day) => {
        const date = day.date;
        if (dateCounts[date]) {
          dateCounts[date] += 1;
        } else {
          dateCounts[date] = 1;
        }
      });
    });

    let perfectDayCount = 0;
    const totalHabitsInEachDay: { [key: string]: number } = {};
    const uniqueDates = Object.keys(dateCounts);
    for (const date of uniqueDates) {
      const getTwoFirstDayLetter = getCurrentDayName(date).slice(0, 2);

      const numberOfHabitsEachDay = allHabits.filter((singleHabit) => {
        return singleHabit.frequency[0].days.some(
          (day) => day === getTwoFirstDayLetter
        );
      });

      totalHabitsInEachDay[date] = numberOfHabitsEachDay.length;
    }

    for (const date in totalHabitsInEachDay) {
      if (totalHabitsInEachDay[date] === dateCounts[date]) {
        perfectDayCount++;
      }
    }

    //Calculate the average per day of Habits completed
    let totalCompletedHabits = 0;
    // 1. Count the total of completed habits
    Object.values(dateCounts).forEach((habitCount) => {
      totalCompletedHabits += habitCount;
    });

    //2. Calculate the average
    const averagePerDaily = (totalCompletedHabits / uniqueDates.length).toFixed(
      2
    );

    // calculate the total streak
    const streaks = allHabits.map((habit) => calculateStreak(habit));
    const totalStreak = streaks.reduce((a, b) => a + b, 0);

    // Update the state
    const copyStatisticsCard = [...statisticsCard];
    copyStatisticsCard[0].counter = allHabits.length;
    copyStatisticsCard[1].counter = perfectDayCount;
    copyStatisticsCard[2].counter = parseFloat(averagePerDaily);
    copyStatisticsCard[3].counter = totalStreak;
    setStatisticsCard(copyStatisticsCard);
  }, [allHabits]);

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? darkModeColor.background : "white",
        color: isDarkMode ? darkModeColor.textColor : "black",
      }}
      className="p-5 mt-4 rounded-md grid grid-cols-4 gap-4 max-sm:grid-cols-3 "
    >
      {filteredStatisticsCard.map((singleCard, singleIndex) => (
        <div
          style={{
            backgroundColor: isDarkMode
              ? darkModeColor.backgroundSlate
              : defaultColor.backgroundSlate,
          }}
          key={singleIndex}
          className="flex flex-col gap-1 items-start p-5 rounded-md"
        >
          <FontAwesomeIcon className="text-blue-500" icon={singleCard.icon} />
          <span className="font-bold text-xl mt-3"> {singleCard.counter} </span>
          <span className="font-light text-sm"> {singleCard.text} </span>
        </div>
      ))}
    </div>
  );
}

export function calculateStreak(habit: HabitType): number {
  function getDayOfTheWeek(dateString: string): string {
    const date = new Date(dateString);
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    return days[date.getUTCDay()];
  }

  // convert completed days to day od the week
  const completedDays = habit.completedDays.map((day) => day.date);
  const frequency = habit.frequency[0].days;
  const completedDaysOfWeek = completedDays.map(getDayOfTheWeek);

  let streak = 0;
  let maxStreak = 0;
  let lastIndex = -1;

  for (let i = 0; i < completedDaysOfWeek.length; i++) {
    const day = completedDaysOfWeek[i];
    const currentIndex = frequency.indexOf(day);

    if (currentIndex === -1) {
      streak = 0; // Reset streak if day is not in frequency
    } else {
      if (
        lastIndex === -1 ||
        currentIndex === (lastIndex + 1) % frequency.length
      ) {
        streak++;
      } else {
        streak = 1;
      }
      lastIndex = currentIndex;
      maxStreak = Math.max(maxStreak, streak);
    }
  }

  return streak;
}
