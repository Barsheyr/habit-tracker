"use client";

import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { GlobalContextType } from "./Types/GlobalContextTypes";
import { menuItemType } from "./Types/MenuItemTypes";
import { DarkModeItem } from "./Types/DarkModeTypes";
import { AreaType, HabitType } from "./Types/GlobalTypes";
import { textToIcon } from "@/app/Pages/AllHabits/components/IconWindow/IconData";
import {
  faChartSimple,
  faRectangleList,
  faLayerGroup,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { getDateString } from "./utils/allHabitUtils/DateFunctions";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";

const GlobalContext = createContext<GlobalContextType>({
  menuItemsObject: {
    menuItems: [],
    setMenuItems: () => {},
  },
  openSideBarObject: {
    openSideBar: false,
    setOpenSideBar: () => {},
  },
  darkModeObject: {
    isDarkMode: false,
    setDarkMode: () => {},
    darkModeItems: [],
    setDarkModeItems: () => {},
  },
  habitWindowObject: {
    openHabitWindow: false,
    setOpenHabitWindow: () => {},
  },
  openTimePickerObject: {
    openTimePickerWindow: false,
    setOpenTimePickerWindow: () => {},
  },
  allAreasObject: {
    allAreas: [],
    setAllAreas: () => {},
  },
  allHabitsObject: {
    allHabits: [],
    setAllHabits: () => {},
  },
  selectedCurrentDayObject: {
    selectedCurrentDate: "",
    setSelectedCurrentDate: () => {},
  },
  offsetDayObject: {
    offsetDay: 0,
    setOffsetDay: () => {},
  },
  selectedAreaStringObject: {
    selectedAreaString: "",
    setSelectedAreaString: () => {},
  },
  allFilteredHabitsObject: {
    allFilteredHabits: [],
    setAllFilteredHabits: () => {},
  },
  openDropDownObject: {
    openDropdown: false,
    setOpenDropdown: () => {},
  },
  dropDownPositionObject: {
    dropDownPositions: { top: 0, left: 0 },
    setDropDownPositions: () => {},
  },

  openConfirmationWindowObject: {
    openConfirmationWindow: false,
    setOpenConfirmationWindow: () => {},
  },
  selectedItemsObject: {
    selectedItems: null,
    setSelectedItems: () => {},
  },
});

function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<menuItemType[]>([
    { name: "All Habits", isSelected: true, icon: faRectangleList },
    { name: "Statistics", isSelected: false, icon: faChartSimple },
    { name: "Areas", isSelected: false, icon: faLayerGroup },
  ]);
  const [allHabits, setAllHabits] = useState<HabitType[]>([]);
  const [darkModeItems, setDarkModeItems] = useState<DarkModeItem[]>([
    { id: 1, icon: faSun, isSelected: true },
    { id: 2, icon: faMoon, isSelected: false },
  ]);
  const [allAreas, setAllAreas] = useState<AreaType[]>([]);

  const [openSideBar, setOpenSideBar] = useState(false);
  const [isDarkMode, setDarkMode] = useState<boolean>(false);
  const [openHabitWindow, setOpenHabitWindow] = useState<boolean>(false);
  const [openTimePickerWindow, setOpenTimePickerWindow] =
    useState<boolean>(false);

  const [selectedCurrentDate, setSelectedCurrentDate] = useState(() =>
    getDateString(new Date())
  );
  const [offsetDay, setOffsetDay] = useState(0);
  const [selectedAreaString, setSelectedAreaString] = useState<string>("All");
  const [allFilteredHabits, setAllFilteredHabits] = useState<HabitType[]>([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [dropDownPositions, setDropDownPositions] = useState({
    top: 0,
    left: 0,
  });

  const [openConfirmationWindow, setOpenConfirmationWindow] = useState(false);
  const [selectedItems, setSelectedItems] = useState<
    HabitType | AreaType | null
  >(null);

  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    function fetchData() {
      const allHabitsData: HabitType[] = [
        {
          _id: uuidv4(),
          name: "habit 1",
          icon: textToIcon("faTools") as IconProp,
          clerkUserId: user?.id || "",
          frequency: [{ type: "Daily", days: ["Mo", "Sa"], number: 1 }],
          notificationTime: "",
          isNotificationOn: false,
          areas: [
            {
              _id: uuidv4(),
              icon: textToIcon("faGraduationCap"),
              name: "Study",
            },
            { _id: uuidv4(), icon: textToIcon("faCode"), name: "Code" },
          ],
          completedDays: [
            { _id: uuidv4(), date: "03/06/2024" },
            { _id: uuidv4(), date: "03/07/2024" },
          ],
        },
      ];

      setTimeout(() => {
        setAllHabits(allHabitsData);
      }, 1000);
    }

    function fetchAllAreas() {
      const allAreasData: AreaType[] = [
        { _id: uuidv4(), icon: textToIcon("faGlobe"), name: "All" },
        { _id: uuidv4(), icon: textToIcon("faBook"), name: "Study" },
        { _id: uuidv4(), icon: textToIcon("faLaptopCode"), name: "Code" },
      ];

      setAllAreas(allAreasData);
    }

    fetchData();
    fetchAllAreas();
  }, [isSignedIn, isLoaded]);

  //Each time the menu items are updated, the sidebar is closed
  useEffect(() => {
    setOpenSideBar(false);
  }, [menuItems]);

  return (
    <GlobalContext.Provider
      value={{
        menuItemsObject: { menuItems, setMenuItems },
        openSideBarObject: { openSideBar, setOpenSideBar },
        darkModeObject: {
          isDarkMode,
          setDarkMode,
          darkModeItems,
          setDarkModeItems,
        },
        habitWindowObject: {
          openHabitWindow,
          setOpenHabitWindow,
        },
        openTimePickerObject: {
          openTimePickerWindow,
          setOpenTimePickerWindow,
        },
        allAreasObject: {
          allAreas,
          setAllAreas,
        },
        allHabitsObject: {
          allHabits,
          setAllHabits,
        },
        selectedCurrentDayObject: {
          selectedCurrentDate,
          setSelectedCurrentDate,
        },
        offsetDayObject: {
          offsetDay,
          setOffsetDay,
        },
        selectedAreaStringObject: {
          selectedAreaString,
          setSelectedAreaString,
        },
        allFilteredHabitsObject: {
          allFilteredHabits,
          setAllFilteredHabits,
        },
        openDropDownObject: {
          openDropdown,
          setOpenDropdown,
        },
        dropDownPositionObject: {
          dropDownPositions,
          setDropDownPositions,
        },
        openConfirmationWindowObject: {
          openConfirmationWindow,
          setOpenConfirmationWindow,
        },
        selectedItemsObject: {
          selectedItems,
          setSelectedItems,
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContextProvider() {
  return useContext(GlobalContext);
}

export default GlobalContextProvider;
