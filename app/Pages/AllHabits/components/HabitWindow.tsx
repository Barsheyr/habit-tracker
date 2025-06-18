"use client";

import React, { useEffect, useState, useRef, SetStateAction } from "react";
import { darkModeColor, defaultColor } from "@/colors";
import { useGlobalContextProvider } from "@/app/contextApi";
import { faFlask, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconWindow from "./IconWindow/IconWindow";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { TimerPicker } from "./TimePicker";
import HabitWindowArea from "./HabitWindow/HabitWindowAreas";
import { AreaType } from "@/app/Types/GlobalTypes";
import { HabitType } from "@/app/Types/GlobalTypes";
import { addNewHabit } from "@/app/utils/allHabitUtils/addNewHabit";
import toast from "react-hot-toast";
import { editHabit } from "@/app/utils/allHabitUtils/editHabits";
import { useUser } from "@clerk/nextjs";

type RepeatOption = {
  name: string;
  isSelected: boolean;
};

type DayOption = {
  id: number;
  name: string;
  isSelected: boolean;
};

function HabitWindow() {
  const {
    habitWindowObject,
    darkModeObject,
    selectedItemsObject,
    openIconWindowObject,
  } = useGlobalContextProvider();
  const { openHabitWindow } = habitWindowObject;
  const { isDarkMode } = darkModeObject;
  const { selectedItems } = selectedItemsObject;
  const { setOpenIconWindow, iconSelected, setIconSelected } =
    openIconWindowObject;

  const { user } = useUser();
  //
  const [habitItem, setHabitItem] = useState<HabitType>({
    _id: "",
    name: "",
    icon: faFlask,
    clerkUserId: user?.id || "",
    frequency: [{ type: "Daily", days: ["Mo"], number: 1 }],
    notificationTime: "",
    isNotificationOn: false,
    areas: [],
    completedDays: [],
  });

  useEffect(() => {
    // when the window is closed empty reset the habit item
    if (!openHabitWindow) {
      setHabitItem({
        _id: "",
        name: "",
        icon: faFlask,
        clerkUserId: user?.id || "",
        frequency: [{ type: "Daily", days: ["Mo"], number: 1 }],
        notificationTime: "",
        isNotificationOn: false,
        areas: [],
        completedDays: [],
      });
    } else {
      // if the window is opened, we check if there is a selected item
      if (selectedItems) {
        setHabitItem(selectedItems as HabitType);
      }
    }
  }, []);

  const onUpdateHabitName = (inputText: string) => {
    // creating a shallow copy of the habit item
    const copyHabitItem = { ...habitItem };
    // Modifying the name property based on the inputText
    copyHabitItem.name = inputText;
    // updating the habit item state
    setHabitItem(copyHabitItem);
  };

  // This callback function from the Repeat functional Component, update the habit item object's frequency property
  function changeRepeatOption(repeatOptions: RepeatOption[]) {
    // First we filter only the element we selected
    const filterIsSelected = repeatOptions.filter(
      (singleOption) => singleOption.isSelected
    );

    // we extract only the name of the object
    const nameOfSelectedOption = filterIsSelected[0].name;

    // we create a shallow copy of the habit Item
    const copyHabitsItem = { ...habitItem };

    //Update the type of the frequency property
    copyHabitsItem.frequency[0].type = nameOfSelectedOption;

    // Update the habit item of update the UI
    setHabitItem(copyHabitsItem);

    // End of the function
  }

  function changeDayOption(allDays: DayOption[]) {
    const selectedDays = allDays
      .filter((singleDay) => singleDay.isSelected)
      .map((day) => day.name);
    const copyHabitItems = { ...habitItem };

    copyHabitItems.frequency[0].days = selectedDays;

    setHabitItem(copyHabitItems);
  }

  function changeWeeksOption(weeks: number) {
    // we create a shallow copy of the habit item
    const copyHabitsItem = { ...habitItem };
    // update the type of the frequency property
    copyHabitsItem.frequency[0].number = weeks;
    // Update the habit item to update the UI
    setHabitItem(copyHabitsItem);
  }

  // This callback function will update the notification property selected from the TimerPicker window
  function updateReminderTime(timeValue: string) {
    // we create a shallow copy pf the habit item
    const copyHabitsItem = { ...habitItem };

    // update the notification Time property
    copyHabitsItem.notificationTime = timeValue;

    // update the habit item to update the UI
    setHabitItem(copyHabitsItem);
  }

  function getSelectedAreaItems(selectedAreaItems: AreaType[]) {
    // we create a shallow copy of the habit type
    const copyHabitsItem = { ...habitItem };

    //update the area property
    copyHabitsItem.areas = selectedAreaItems;
    // update the habit item to update the ui
    setHabitItem(copyHabitsItem);
  }

  useEffect(() => {
    // creating a shallow copy of the habit item
    const copyHabitItem = { ...habitItem };
    // modifying the icon properly
    copyHabitItem.icon = iconSelected;
    // updating the habit item state
    setHabitItem(copyHabitItem);
  }, [iconSelected]);

  useEffect(() => {
    // Update clerkUserId when user becomes available
    if (user?.id && habitItem.clerkUserId === "") {
      setHabitItem((prev) => ({
        ...prev,
        clerkUserId: user.id,
      }));
    }
  }, [user?.id, habitItem.clerkUserId]);

  useEffect(() => {
    if (openHabitWindow) {
      setHabitItem({
        _id: "",
        name: "",
        icon: faQuestion,
        clerkUserId: user?.id || "", // Add this line
        frequency: [{ type: "Daily", days: ["Mo"], number: 1 }],
        notificationTime: "",
        isNotificationOn: false,
        areas: [],
        completedDays: [],
      });
    } else {
      // if the window is opened, we check if there is a selected item
      //
      if (selectedItems) {
        setHabitItem(selectedItems as HabitType);
      }
    }
  }, [openHabitWindow, user?.id]);

  useEffect(() => {
    if (selectedItems) {
      setHabitItem(selectedItems as HabitType);
    }
  }, [selectedItems]);

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? darkModeColor.background : "white",
        color: isDarkMode ? darkModeColor.textColor : "black",
      }}
      className={`top-[3%] left-1/2 transform -translate-x-1/2 w-[80%] z-50 p-10 rounded-md shadow-md ${
        openHabitWindow ? "absolute" : "hidden"
      }`}
    >
      <TimerPicker onSaveTime={updateReminderTime} />
      <IconWindow />
      <Header />
      <InputNameAndIconButton
        onUpdateHabitName={onUpdateHabitName}
        habitName={habitItem.name}
        setOpenIconWindow={setOpenIconWindow}
        iconSelected={iconSelected}
        setIconSelected={setIconSelected}
      />
      <Repeat
        onChangeOption={changeRepeatOption}
        onChangeDayOption={changeDayOption}
        onChangeWeeksOption={changeWeeksOption}
      />
      <Reminder habitItem={habitItem} setHabitItem={setHabitItem} />
      <HabitWindowArea onChange={getSelectedAreaItems} />
      <SaveButton habit={habitItem} />
    </div>
  );
}

export default HabitWindow;

function Header() {
  const { habitWindowObject, selectedItemsObject } = useGlobalContextProvider();
  const { setOpenHabitWindow, openHabitWindow } = habitWindowObject;
  const { setSelectedItems, selectedItems } = selectedItemsObject;
  const [header, setHeader] = useState("Add New Habit");

  useEffect(() => {
    if (selectedItems) {
      setHeader("Edit Habit");
    } else {
      setHeader("Add New Habit");
    }
  }, [openHabitWindow, selectedItems]);

  return (
    <div className="flex justify-between items-center">
      <span className="font-bold text-xl"> {header} </span>
      <FontAwesomeIcon
        onClick={() => {
          setOpenHabitWindow(false);
          setSelectedItems(null);
        }}
        className="text-gray-400 cursor-pointer"
        icon={faClose}
      />
    </div>
  );
}

function InputNameAndIconButton({
  onUpdateHabitName,
  habitName,
  setOpenIconWindow,
  iconSelected,
  setIconSelected,
}: {
  onUpdateHabitName: (inputText: string) => void;
  habitName: string;
  setOpenIconWindow: React.Dispatch<React.SetStateAction<boolean>>;
  iconSelected: IconProp;
  setIconSelected: React.Dispatch<React.SetStateAction<IconProp>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { habitWindowObject, darkModeObject, selectedItemsObject } =
    useGlobalContextProvider();
  const { openHabitWindow } = habitWindowObject;
  const { isDarkMode } = darkModeObject;
  const { selectedItems } = selectedItemsObject;

  function updateInputHabit(event: React.ChangeEvent<HTMLInputElement>) {
    onUpdateHabitName(event.target.value);
  }

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);

    // when the window is closed empty the input field by using the callback function
    if (!openHabitWindow) {
      onUpdateHabitName("");
    } else {
      if (selectedItems) {
        onUpdateHabitName(selectedItems.name);
        setIconSelected(selectedItems.icon);
      }
    }
  }, [openHabitWindow]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [iconSelected]);

  return (
    <div className="flex flex-col gap-2 mt-10 px-3">
      <span className="opacity-80 font-semibold"> Habit Name </span>
      <div className="flex gap-4 justify-between items-center">
        <input
          style={{
            backgroundColor: isDarkMode ? darkModeColor.background : "white",
          }}
          ref={inputRef}
          value={habitName}
          onChange={(event) => updateInputHabit(event)}
          className={`border w-full border-gray-200 outline-none p-4 rounded-md text-[13px]`}
          placeholder="Type a name for the habit..........."
        />
        <FontAwesomeIcon
          onClick={() => setOpenIconWindow(true)}
          className="bg-mainColor mt-[1px] p-4 rounded-md text-white cursor-pointer bg-blue-500"
          icon={iconSelected}
          height={16}
          width={20}
        />
      </div>
    </div>
  );
}

function Repeat({
  onChangeOption,
  onChangeDayOption,
  onChangeWeeksOption,
}: {
  onChangeOption: (repeatOptions: RepeatOption[]) => void;
  onChangeDayOption: (allDays: DayOption[]) => void;
  onChangeWeeksOption: (weeks: number) => void;
}) {
  const [repeatOptions, setRepeatOptions] = useState<RepeatOption[]>([
    { name: "Daily", isSelected: true },
    { name: "Weekly", isSelected: false },
  ]);

  const days: DayOption[] = [
    { id: 1, name: "Mo", isSelected: true },
    { id: 2, name: "Tu", isSelected: false },
    { id: 3, name: "We", isSelected: false },
    { id: 4, name: "Th", isSelected: false },
    { id: 5, name: "Fr", isSelected: false },
    { id: 6, name: "Sa", isSelected: false },
    { id: 7, name: "Su", isSelected: false },
  ];

  const [allDays, setAllDays] = useState<DayOption[]>(days);
  const [weeks, setWeeks] = useState(1);
  const { darkModeObject, selectedItemsObject, habitWindowObject } =
    useGlobalContextProvider();
  const { selectedItems } = selectedItemsObject;
  const { openHabitWindow } = habitWindowObject;
  const { isDarkMode } = darkModeObject;
  const [nameOfSelectedOption, setNameOfSelectedOption] = useState("");

  function changeOption(indexClicked: number) {
    const updateRepeatOptions = repeatOptions.map((singleOption, index) => {
      if (index === indexClicked) {
        return { ...singleOption, isSelected: true };
      }

      return { ...singleOption, isSelected: false };
    });
    // change the local repeat option array
    setRepeatOptions(updateRepeatOptions);
    // Trigger the callback to pass up the "updateRepeatOption" to the parent component
    onChangeOption(updateRepeatOptions);
  }

  useEffect(() => {
    // Trigger the callback function to pass it in the allDays array
    onChangeDayOption(allDays);
  }, [allDays]);

  useEffect(() => {
    onChangeWeeksOption(weeks);
  }, [weeks]);

  // This useEffect get the name of selection option and update it in the nameOfSelectedOption variable
  useEffect(() => {
    if (!openHabitWindow) {
      const getNameOptionSelected = repeatOptions.filter(
        (singleOption) => singleOption.isSelected
      )[0].name;

      setNameOfSelectedOption(getNameOptionSelected);
    }

    // if the selected items is not null, it means that we are going to edit the habit
    if (selectedItems) {
      // Assert the type of selectedItems
      const currentHabitSelected = selectedItems as HabitType;
      // Get the name of the selected option
      const selectedOptionOfHabitSelected =
        currentHabitSelected.frequency[0].type;
      // Update the name of the selectedOption based on the selectedOption
      const copyRepeatOptions = repeatOptions.map((singleOption) => {
        if (singleOption.name === selectedOptionOfHabitSelected) {
          return { ...singleOption, isSelected: true };
        }
        return { ...singleOption, isSelected: false };
      });
      //Update the repeatOptions Array
      setRepeatOptions(copyRepeatOptions);
    } else {
      // if the selectedItems is null, it means we are going to create a new habit
      // set both items as false in the repeated options
      const copyRepeatOptions = repeatOptions.map((singleOption) => {
        return { ...singleOption, isSelected: false };
      });

      // set the first option as selected
      copyRepeatOptions[0].isSelected = true;
      //Update the first repeatOptions array
      setRepeatOptions(copyRepeatOptions);
    }
  }, [openHabitWindow]);

  useEffect(() => {
    const getNameOptionSelected = repeatOptions.filter(
      (singleOption) => singleOption.isSelected
    )[0].name;

    setNameOfSelectedOption(getNameOptionSelected);
  }, [repeatOptions]);

  return (
    <div className="flex flex-col gap-2 mt-10 px-3">
      <span className="font-semibold text-[17px]"> Repeat </span>
      <div className="flex gap-4 mt-2 items-center">
        {repeatOptions.map((singleOption, index) => (
          <button
            key={index}
            onClick={() => changeOption(index)}
            style={{
              color: !singleOption.isSelected
                ? !isDarkMode
                  ? defaultColor.default
                  : darkModeColor.textColor
                : "",
              backgroundColor: singleOption.isSelected
                ? defaultColor.default
                : !isDarkMode
                ? defaultColor[100]
                : defaultColor[50],
            }}
            className="p-2 px-3 rounded-md text-white cursor-pointer"
          >
            {singleOption.name}
          </button>
        ))}
      </div>
      {nameOfSelectedOption === "Daily" ? (
        <DailyOptions allDays={allDays} setAllDays={setAllDays} />
      ) : (
        <WeeklyOption weeks={weeks} setWeek={setWeeks} />
      )}
    </div>
  );
}

function DailyOptions({
  allDays,
  setAllDays,
}: {
  allDays: DayOption[];
  setAllDays: React.Dispatch<React.SetStateAction<DayOption[]>>;
}) {
  const { darkModeObject, habitWindowObject, selectedItemsObject } =
    useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;
  const { openHabitWindow } = habitWindowObject;
  const { selectedItems } = selectedItemsObject;

  function selectedDays(singleDayIndex: number) {
    const selectedCount: number = allDays.filter(
      (singleDay) => singleDay.isSelected
    ).length;

    const updateAllDays = allDays.map((singleDay, index) => {
      if (
        selectedCount === 1 &&
        singleDay.isSelected === true &&
        index === singleDayIndex
      ) {
        return singleDay;
      }

      return index === singleDayIndex
        ? { ...singleDay, isSelected: !singleDay.isSelected }
        : singleDay;
    });

    setAllDays(updateAllDays);
  }

  useEffect(() => {
    if (openHabitWindow) {
      if (!selectedItems) {
        const updateSelectedDays = allDays.map((singleDay) => {
          return { ...singleDay, isSelected: false };
        });
        updateSelectedDays[0].isSelected = true;
        setAllDays(updateSelectedDays);
      } else {
        const currentHabitSelected = selectedItems as HabitType;
        //
        const selectedOptionsHabitSelected =
          currentHabitSelected.frequency[0].days;
        //
        const updateSelectedDays = allDays.map((singleDay) => {
          if (selectedOptionsHabitSelected) {
            return { ...singleDay, isSelected: true };
          } else {
            return { ...singleDay, isSelected: false };
          }
        });
        setAllDays(updateSelectedDays);
      }
    }
  }, [openHabitWindow]);

  return (
    <div className="mt-5 flex flex-col gap-4">
      <div className=" font-medium opacity-85">
        <span> On These Days </span>
        <div className="flex gap-3 w-full">
          {allDays.map((singleDay, singleDayIndex) => (
            <span
              key={singleDayIndex}
              onClick={() => selectedDays(singleDayIndex)}
              style={{
                color: !singleDay.isSelected
                  ? !isDarkMode
                    ? defaultColor.default
                    : darkModeColor.textColor
                  : "",
                backgroundColor: singleDay.isSelected
                  ? defaultColor.default
                  : !isDarkMode
                  ? defaultColor[100]
                  : defaultColor[50],
              }}
              className={`p-2 px-3 w-11 text-center rounded-md select-none cursor-pointer ${
                singleDay.isSelected ? "text-white" : "text-gray-900"
              }`}
            >
              {singleDay.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function WeeklyOption({
  weeks,
  setWeek,
}: {
  weeks: number;
  setWeek: React.Dispatch<SetStateAction<number>>;
}) {
  const { darkModeObject } = useGlobalContextProvider();
  const { isDarkMode } = darkModeObject;

  function updateCounter(option: string) {
    if (option === "up") {
      setWeek((prev) => (prev < 7 ? prev + 1 : 7));
    }
    if (option === "down") {
      setWeek((prev) => (prev > 1 ? prev - 1 : 1));
    }
  }

  return (
    <div className="mt-7 flex gap-20">
      <div className="flex flex-col gap-2">
        <span className="font-semibold"> Frequency </span>
        <span className="text-sm font-light text-gray-400">
          {weeks} times a week
        </span>
      </div>

      <div className="flex items-center justify-center">
        <button
          onClick={() => updateCounter("down")}
          style={{
            backgroundColor: isDarkMode ? defaultColor[100] : defaultColor[50],
            color: isDarkMode ? defaultColor.default : defaultColor.textColor,
          }}
          className="p-3 w-10 rounded-md text-white"
        >
          -
        </button>
        <span className="p-4 px-5 select-none"> {weeks} </span>
        <button
          onClick={() => updateCounter("up")}
          style={{
            backgroundColor: isDarkMode ? defaultColor[100] : defaultColor[50],
            color: isDarkMode ? defaultColor.default : defaultColor.textColor,
          }}
          className="p-3 w-10 rounded-md text-white"
        >
          +
        </button>
      </div>
    </div>
  );
}

function Reminder({
  habitItem,
  setHabitItem,
}: {
  habitItem: HabitType;
  setHabitItem: React.Dispatch<React.SetStateAction<HabitType>>;
}) {
  const {
    darkModeObject,
    openTimePickerObject,
    habitWindowObject,
    selectedItemsObject,
  } = useGlobalContextProvider();
  const { setOpenTimePickerWindow } = openTimePickerObject;
  const { isDarkMode } = darkModeObject;
  const { selectedItems } = selectedItemsObject;
  const { openHabitWindow } = habitWindowObject;

  const [isOn, setIsOn] = useState(false);

  function updateToggle() {
    const copyHabitItem = { ...habitItem };
    copyHabitItem.isNotificationOn = !isOn;
    setHabitItem(copyHabitItem);
    setIsOn(!isOn);
  }

  function openTheTimerPicker() {
    setOpenTimePickerWindow(true);
  }

  //////////   if there is a selected Items
  ////////////////// 1. get the selected habit
  ////////////////// 2. check if notification is on
  ////////////////// 3. set the isOn state
  ////////////////// 4. update the UI
  ///// IF THERE IS NO SELECTED ITEMS, SET THE isOn STATE TO FALSE

  useEffect(() => {
    if (selectedItems) {
      const currentHabitSelected = selectedItems as HabitType;
      const { isNotificationOn } = currentHabitSelected;
      setIsOn(isNotificationOn);
    } else {
      setIsOn(false);
    }
  }, [openHabitWindow]);

  return (
    <div className="flex flex-col gap-2 mt-20 px-3">
      <div className="flex justify-between">
        <span className="font-semibold text-[17px]"> Daily Notification </span>
        <ToggleSwitch />
      </div>

      {isOn && (
        <div
          style={{
            backgroundColor: isDarkMode ? defaultColor.blue : defaultColor.blue,
            color: isDarkMode
              ? defaultColor.textColor
              : darkModeColor.whiteColor,
          }}
          className="flex justify-between p-4 m-2 mt-8 rounded-md"
        >
          <span> Select Time </span>
          <div
            onClick={openTheTimerPicker}
            className="flex gap-2 items-center justify-center cursor-pointer select-none"
          >
            <span>
              {habitItem.notificationTime !== ""
                ? habitItem.notificationTime
                : "none"}
            </span>
            <FontAwesomeIcon height={12} width={12} icon={faChevronDown} />
          </div>
        </div>
      )}
    </div>
  );

  function ToggleSwitch() {
    return (
      <div
        className={`${
          isOn ? "bg-blue-500" : "bg-slate-400"
        } w-16 h-[30px] relative rounded-lg flex`}
      >
        <div onClick={updateToggle} className="w-1/2 h-full"></div>
        <div onClick={updateToggle} className="w-1/2 h-full"></div>
        <div
          className={` bg-white h-6 w-6 rounded-full  ${
            isOn ? "right" : "left"
          } -[3px] top-[3px] absolute`}
        ></div>
      </div>
    );
  }
}

function SaveButton({ habit }: { habit: HabitType }) {
  const { allHabitsObject, habitWindowObject, selectedItemsObject } =
    useGlobalContextProvider();
  const { allHabits, setAllHabits } = allHabitsObject;
  const { openHabitWindow, setOpenHabitWindow } = habitWindowObject;
  const { selectedItems, setSelectedItems } = selectedItemsObject;
  const [buttonText, setButtonText] = useState("Add a Habit");
  const { user } = useUser();

  useEffect(() => {
    if (selectedItems) {
      setButtonText("Edit Habit");
    } else {
      setButtonText("Add New Habit");
    }
  }, [openHabitWindow, selectedItems]);

  function checkHabitObject() {
    // Add this check at the beginning
    if (!user?.id) {
      return toast.error("Please wait for authentication to load");
    }

    if (!selectedItems) {
      if (habit.name.trim() === "") {
        return toast.error("the habit name filed is still empty");
      }

      // Add this check to ensure clerkUserId is set
      if (!habit.clerkUserId) {
        return toast.error("User authentication error. Please try again.");
      }

      const habitExist = allHabits.some(
        (singleHabit) => singleHabit.name === habit.name
      );

      if (!habitExist) {
        addNewHabit({ allHabits, setAllHabits, habit });
        setOpenHabitWindow(false);
      } else {
        editHabit({ allHabits, setAllHabits, habit, selectedItems });
        //close the window
        setOpenHabitWindow(false);
      }

      setSelectedItems(null);
    }
  }

  return (
    <div className="w-full flex justify-center mt-9 bg-blue-600 shadow-2xl rounded-md">
      <button onClick={checkHabitObject} className="p-4 w-full text-white">
        {buttonText}
      </button>
    </div>
  );
}
