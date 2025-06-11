import React from "react";
import DataForModal from "@/Modal";
import AllAreaContainer from "./Components/AllAreaContainer";
import AllAreasTopBar from "./Components/AllAreasTopBar";
import Dropdown from "@/app/Dropown";
import { ConfirmationWindow } from "@/app/CofirmationWindow";
import { useGlobalContextProvider } from "@/app/contextApi";
import IconsWindow from "../AllHabits/components/IconWindow/IconWindow";

const Areas = () => {
  const {
    openIconWindowObject: {
      openIconWindow,
      setOpenIconWindow,
      iconSelected,
      setIconSelected,
    },
  } = useGlobalContextProvider();

  return (
    <div className="w-full h-screen p-3 relative">
      <IconsWindow
        openIconWindow={openIconWindow}
        setIconSelected={setIconSelected}
        setOpenIconWindow={setOpenIconWindow}
        iconSelected={iconSelected}
      />
      <AllAreasTopBar />
      <AllAreaContainer />
      <Dropdown />
      <ConfirmationWindow />
    </div>
  );
};

export default Areas;
