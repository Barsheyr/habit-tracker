import React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { darkModeColor, defaultColor } from "@/colors";
import { useGlobalContextProvider } from "@/app/contextApi";
import dayjs, { Dayjs } from "dayjs";
import { getDateString } from "@/app/utils/allHabitUtils/DateFunctions";

const Calender = () => {
  const { darkModeObject, selectedCurrentDayObject, offsetDayObject } =
    useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;
  const { selectedCurrentDate, setSelectedCurrentDate } =
    selectedCurrentDayObject;
  const { setOffsetDay } = offsetDayObject;

  // convert selectedCurrentDate to Dayjs object
  const value: Dayjs | null = selectedCurrentDate
    ? dayjs(selectedCurrentDate)
    : null;

  function handleOnChangeDate(newDate: Dayjs) {
    // CONVERT FROM THE DAY.JS TO OBJECT TO JAVASCRIPT DATE OBJECT
    const jsDate = newDate.toDate();
    const currentDate = new Date();

    // calculate the difference in milliseconds
    const differenceInMs = jsDate.getTime() - currentDate.getTime();

    // calculate the difference in days
    const differenceInDays = differenceInMs / (1000 * 3600 * 24);

    setOffsetDay(Math.floor(differenceInDays + 1));
  }

  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.backgroundSlate
          : defaultColor.backgroundSlate,
      }}
      className="flex mx-4 flex-col gap-6 justify-center items-center mt-10 rounded-xl pt-7"
    >
      <DateCalendar
        onChange={handleOnChangeDate}
        value={value}
        sx={{
          "& .MuiPickersDay-root": {
            color: isDarkMode
              ? darkModeColor.textColor
              : defaultColor.textColor,
            "&.Mui-selected": {
              backgroundColor: defaultColor.default,
              color: "white",
            },
          },
          "& .MuiPickersYear-yearButton": {
            color: isDarkMode
              ? darkModeColor.textColor
              : defaultColor.textColor,
            "&.Mui-selected": {
              backgroundColor: defaultColor.default,
              color: "white",
            },
          },
        }}
      />
    </div>
  );
};

export default Calender;
