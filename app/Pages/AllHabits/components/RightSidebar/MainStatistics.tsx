import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { darkModeColor, defaultColor } from "@/colors";
import { useGlobalContextProvider } from "@/app/contextApi";
import { calculateStreak } from "@/app/Pages/Statistics/components/StatisticsBoard";
import { getCurrentDayName } from "@/app/utils/allHabitUtils/DateFunctions";
import { HabitType } from "@/app/Types/GlobalTypes";

const MainStatistics = () => {
  const { darkModeObject, selectedCurrentDayObject, allHabitsObject } =
    useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;
  const { selectedCurrentDate } = selectedCurrentDayObject;
  const { allHabits } = allHabitsObject;

  const [statisticsInfo, setStatisticsInfo] = useState([
    { id: 1, num: 7, subTitle: "Best streaks" },
    { id: 2, num: 10, subTitle: "Perfect Days" },
  ]);

  const [progress, setProgress] = useState<number>(0);

  function calculateThePercentageOfTodaysProgress(
    allHabits: HabitType[]
  ): number {
    //1 get the completed days of the current date
    //2 get all the habits that need to be done for this current day
    if (allHabits.length === 0 || !selectedCurrentDate) {
      return 0;
    }

    let totalHabitsOfCompletedDays = 0;
    let totalHabitsOfCurrentDay = 0;

    if (allHabits) {
      // get the completed days of the current date
      const completedHabitsOfCurrentDate: HabitType[] = allHabits.filter(
        (habit) =>
          habit.completedDays.some((day) => day.date === selectedCurrentDate)
      );

      totalHabitsOfCompletedDays = completedHabitsOfCurrentDate.length;

      // get all the habits that need to be done for this current day
      const getTwoLetterOfCurrentDay = getCurrentDayName(
        selectedCurrentDate
      ).slice(0, 2);

      const allHabitsOfCurrentDay = allHabits.filter((habit) =>
        habit.frequency[0].days.some((day) => day === getTwoLetterOfCurrentDay)
      );

      totalHabitsOfCurrentDay = allHabitsOfCurrentDay.length;
      const result =
        (totalHabitsOfCompletedDays / totalHabitsOfCurrentDay) * 100;

      console.log(result);

      if (result === undefined || isNaN(result)) {
        return 0;
      }
      return result ?? 0;
    }

    return 0;
  }

  useEffect(() => {
    setProgress(calculateThePercentageOfTodaysProgress(allHabits));
  }, [selectedCurrentDate, allHabits]);

  useEffect(() => {
    //Calculate the total streak
    //::::::::::::
    const streaks = allHabits.map((habit) => calculateStreak(habit));
    const totalStreak = streaks.reduce((a, b) => a + b, 0);

    // // calculate tht total perfect days
    // const perfectDays = calculateTotalPerfectDays(allHabits);
    // Updating the statistics
    const copyStatsInfo = [...statisticsInfo];
    copyStatsInfo[0].num = totalStreak;
    // copyStatsInfo[1].num = perfectDays;
    setStatisticsInfo(copyStatsInfo);
  }, [allHabits]);

  return (
    <div
      style={{
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
        backgroundColor: isDarkMode
          ? darkModeColor.backgroundSlate
          : defaultColor.backgroundSlate,
      }}
      className="flex mx-4 flex-col gap-6 justify-center items-center mt-14
     rounded-xl p-10 pt-7"
    >
      <span className="font-bold text-xl cursor-pointer"> Statistics </span>

      {/* . */}
      <div className="relative pt-3">
        <CircularProgressBar progress={89} />
        <div className="flex flex-col justify-center items-center absolute top-[54%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="font-bold text-xl text-blue-500"> 89% </span>
          <span className="text-[11px] "> {progress} </span>
        </div>
      </div>

      {/* ./ */}
      <div className="my-4 flex justify-center gap-6 flex-wrap items-center w-full">
        {statisticsInfo.map((singleItem, singleItemIndex) => (
          <div className="flex items-center gap-3" key={singleItemIndex}>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="text-[13px]">
              <span className="flex flex-col font-extrabold">
                {singleItem.num}
              </span>
              <span
                style={{
                  color: isDarkMode
                    ? darkModeColor.textColor
                    : defaultColor.textColor,
                }}
                className=""
              >
                {singleItem.subTitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface CircularProgressBarProps {
  progress: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  progress,
}) => {
  const data = [
    { name: "Completed", value: progress },
    { name: "Remaining", value: 100 - progress },
  ];

  const COLORS = [defaultColor.default, "#edf2f4"];

  return (
    <PieChart
      width={200}
      height={160}
      margin={{ top: -20, right: 0, bottom: 40, left: 0 }}
    >
      <Pie
        data={data}
        cx={100}
        cy={100}
        startAngle={-100}
        innerRadius={66}
        outerRadius={progress === 100 ? 80 : 70}
        fill="#8884d8"
        paddingAngle={0}
        dataKey="value"
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell -${index} `} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default MainStatistics;
