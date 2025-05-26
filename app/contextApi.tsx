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
import {
  iconToText,
  textToIcon,
} from "@/app/Pages/AllHabits/components/IconWindow/IconData";
import {
  faChartSimple,
  faRectangleList,
  faLayerGroup,
  faMoon,
  faSun,
  faFlask,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { getDateString } from "./utils/allHabitUtils/DateFunctions";
// import { v4 as uuidv4 } from "uuid";
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
  openAreaFormObject: {
    openAreaForm: false,
    setOpenAreaForm: () => {},
  },
  openIconWindowObject: {
    openIconWindow: false,
    setOpenIconWindow: () => {},
    iconSelected: faFlask,
    setIconSelected: () => {},
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
  const [openAreaForm, setOpenAreaForm] = useState(false);
  const [openIconWindow, setOpenIconWindow] = useState(false);
  const [iconSelected, setIconSelected] = useState<IconProp>(faFlask);

  useEffect(() => {
    const fetchAllHabits = async () => {
      try {
        const response = await fetch(`/api/habits?clerk=${user?.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch habits");
        }
        const data: { habits: HabitType[] } = await response.json();

        // Convert the icon of the habit from string to IconProp
        const updatedHabits = data.habits.map((habit: HabitType) => {
          if (typeof habit.icon === "string") {
            return {
              ...habit,
              icon: textToIcon(habit.icon) as IconProp,
            };
          }
          return habit;
        });

        // update the icons
        const updatedHabitsWithAreas = updatedHabits.map((habit: HabitType) => {
          const updatedAreas = habit.areas.map((area: AreaType) => {
            if (typeof area.icon === "string") {
              return {
                ...area,
                icon: textToIcon(area.icon) as IconProp,
              };
            }
            return area;
          });
          return { ...habit, areas: updatedAreas };
        });

        // Update the habits array with the updated icons
        console.log(updatedHabitsWithAreas);

        setAllHabits(updatedHabitsWithAreas);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    async function fetchAllAreas() {
      try {
        const response = await fetch(`/api/areas?clerkId=${user?.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch areas");
        }

        const data: { areas: AreaType[] } = await response.json();

        // create the all area if the user has no area

        if (data.areas.length === 0) {
          const allArea = await addTheAllAreas();
          // Convert the icon of the area from string
          if (typeof allArea?.icon === "string") {
            const updatedArea = {
              ...allArea,
              icon: textToIcon(allArea.icon) as IconProp,
            };

            setAllAreas([updatedArea]);
          }

          return;
        }

        // convert the icons property
        const updatedAreas = data.areas.map((area: AreaType) => {
          if (typeof area.icon === "string") {
            return {
              ...area,
              icon: textToIcon(area.icon) as IconProp,
            };
          }
          return area;
        });
        setAllAreas(updatedAreas);
      } catch (error) {
        console.log(error);
      }
    }

    if (isLoaded && isSignedIn) {
      fetchAllHabits();
      fetchAllAreas();
    }

    fetchAllAreas();
  }, [isSignedIn, isLoaded, user?.id]);

  async function addTheAllAreas() {
    const allArea = {
      icon: iconToText(faGlobe),
      name: "All",
      clerkUserId: user?.id as string,
    };

    try {
      const response = await fetch("/api/areas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(allArea),
      });

      if (!response.ok) {
        throw new Error("Failed to add an area");
      }

      const data = await response.json();
      const { _id } = data.area;
      // update the _id of the area
      const updatedIdOfArea = { ...allArea, _id: _id };

      return updatedIdOfArea;
    } catch (error) {
      console.log(error);
    }
  }

  //Each time the menu items are updated, the sidebar is closed
  useEffect(() => {
    setOpenSideBar(false);
    setOpenConfirmationWindow(false);
    setOpenHabitWindow(false);
    setOpenAreaForm(false);
    setOpenIconWindow(false);
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
        openAreaFormObject: {
          openAreaForm,
          setOpenAreaForm,
        },
        openIconWindowObject: {
          openIconWindow,
          setOpenIconWindow,
          iconSelected,
          setIconSelected,
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
