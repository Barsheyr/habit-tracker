import { menuItemType } from "./MenuItemTypes";
import { Dispatch, SetStateAction } from "react";

export type GlobalContextType = {
  menuItemsObject: {
    menuItems: menuItemType[];
    setMenuItems: Dispatch<SetStateAction<menuItemType[]>>;
  };
};
