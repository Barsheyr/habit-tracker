import React from "react";
import LogoAndName from "../LogoaAndName";
import MenuSelection from "./MenuSelection";
import LogoutSelection from "./LogoutSelection";

const Sidebar = () => {
  return (
    <div className="border-r-2 h-screen p-10 flex flex-col gap-20">
      <LogoAndName />
      <MenuSelection />
      <LogoutSelection />
    </div>
  );
};

export default Sidebar;
