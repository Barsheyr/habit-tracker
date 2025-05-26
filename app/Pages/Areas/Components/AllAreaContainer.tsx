import React, { useEffect, useState } from "react";
import { faStairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AreaType } from "@/app/Types/GlobalTypes";
import { textToIcon } from "../../AllHabits/components/IconWindow/IconData";
import { darkModeColor, defaultColor } from "@/colors";
import { useGlobalContextProvider } from "@/app/contextApi";
import Dropdown from "@/app/Dropown";
import DataFormModal from "@/Modal";
import addNewArea from "@/app/utils/allAreasUtils/addNewArea";
import toast from "react-hot-toast";

const AllAreaContainer = () => {
  const {
    allAreasObject: { allAreas, setAllAreas },
    darkModeObject: { isDarkMode },
    openAreaFormObject: { openAreaForm, setOpenAreaForm },
    selectedItemsObject: { selectedItems },
    openIconWindowObject: { setOpenIconWindow, iconSelected },
  } = useGlobalContextProvider();

  const [areaItem, setAreaItem] = useState<AreaType>({
    _id: "",
    name: "",
    icon: faFlask,
  });

  function handleOnClose() {
    setOpenAreaForm(!openAreaForm);
  }

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAreaItem({
      ...areaItem,
      name: event.target.value,
    });
  }

  function handleOnClick() {
    if (!selectedItems) {
      /// check if the area name is not empty
      if (areaItem.name.trim() === "") {
        return toast.error("The area name filed is still empty");
      }

      // check of there's no area
      const areaExist = allAreas.some(
        (singleArea) =>
          singleArea.name.toLocaleLowerCase() ===
          areaItem.name.toLocaleLowerCase()
      );
      if (areaExist) {
        toast.error("The area already exists");
        return;
      }

      try {
        addNewArea({ allAreas, setAllAreas, areaItem });
        setOpenAreaForm(false);
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    // when the form is closed reset the area item
    if (!openAreaForm) {
      setAreaItem((prevAreaItem) => ({
        ...prevAreaItem,
        name: "",
      }));
      return;
    }
    // Generate a new Id when it is opened
    setAreaItem({
      ...areaItem,
      _id: uuidv4(),
    });
  }, [openAreaForm]);

  // change the icon property of the area
  useEffect(() => {
    setAreaItem({
      ...areaItem,
      icon: iconSelected,
    });
  }, [iconSelected]);

  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
      }}
      className="w-full mt-5 p-6 flex flex-col gap-6 rounded-md"
    >
      <Dropdown />
      <DataFormModal
        isOpen={openAreaForm}
        onClose={handleOnClose}
        onChange={handleOnChange}
        FormTitle="Add New Title"
        onClick={handleOnClick}
        textValue={areaItem.name}
      />
      {allAreas.map((singleArea, index) => (
        <div key={index}>
          <AreaCard singleArea={singleArea} />
        </div>
      ))}
    </div>
  );
};

export default AllAreaContainer;

function AreaCard({ singleArea }: { singleArea: AreaType }) {
  const {
    darkModeObject: { isDarkMode },
    openDropDownObject: { openDropdown, setOpenDropdown },
    dropDownPositionObject: { setDropDownPositions },
    selectedItemsObject: { setSelectedItems },
  } = useGlobalContextProvider();

  function openTheDropDown(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const top = rect.top;
    const left = rect.left;
    setDropDownPositions({ top, left });
    setSelectedItems(singleArea);
    setOpenDropdown(true);
  }

  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
      }}
      className="flex justify-between p-5 rounded-md"
    >
      <div className="flex items-center gap-4">
        <FontAwesomeIcon
          className="w-5 h-5 text-blue-500"
          height={20}
          width={20}
          icon={singleArea.icon}
        />
        <div>
          <span className="font-semibold"> {singleArea.name} </span>
          <span className="text-gray-400 text-sm"> 1 Habit </span>
        </div>
      </div>
      {/* Three dots  */}
      {/* Div for the three dots   */}

      <div className="w-10 flex items-center justify-center">
        {singleArea.name !== "All" && (
          <IconButton onClick={openTheDropDown}>
            <MoreVertIcon sx={{ color: "gray" }} />
          </IconButton>
        )}
      </div>
    </div>
  );
}
