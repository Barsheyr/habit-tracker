import React from "react";
import { useGlobalContextProvider } from "@/app/contextApi";
import { menuItemType } from "@/app/Types/MenuItemTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MenuSelection() {
  const { menuItemsObject } = useGlobalContextProvider();
  const { menuItems } = menuItemsObject;

  return (
    <div className="mt-[180px]">
      {menuItems.map((menuItem: menuItemType, menuItemIndex: number) => (
        <div key={menuItemIndex}>
          <SingleMenuItem menuItemProp={menuItem} />
        </div>
      ))}
    </div>
  );
}

function SingleMenuItem({ menuItemProp }: { menuItemProp: menuItemType }) {
  const { menuItemsObject } = useGlobalContextProvider();
  const { menuItems, setMenuItems } = menuItemsObject;

  function handleClickedItem() {
    const copyMenuItems = menuItems.map((menuItem) => {
      if (menuItemProp.name == menuItem.name) {
        return { ...menuItem, isSelected: true };
      }
      return { ...menuItem, isSelected: false };
    });

    setMenuItems(copyMenuItems);
  }

  return (
    <div
      onClick={handleClickedItem}
      className={`flex gap-2 items-center p-2 mb-3 ml-8 cursor-pointer rounded-md w-36 ${
        menuItemProp.isSelected
          ? "bg-blue-500 transition-all text-white"
          : "hover:text-blue-500"
      }`}
    >
      <FontAwesomeIcon
        className=""
        icon={menuItemProp.icon}
        width={20}
        height={20}
      />
      <div> {menuItemProp.name} </div>
    </div>
  );
}

export default MenuSelection;
