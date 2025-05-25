import React, { useState } from "react";
import DataForModal from "@/Modal";
import AllAreaContainer from "./Components/AllAreaContainer";
import AllAreasTopBar from "./Components/AllAreasTopBar";
import Dropdown from "@/app/Dropown";
import { ConfirmationWindow } from "@/app/CofirmationWindow";

const Areas = () => {
  return (
    <div className="w-full h-screen p-3 relative">
      <AllAreasTopBar />
      <AllAreaContainer />
      <Dropdown />
      <ConfirmationWindow />
    </div>
  );
};

export default Areas;
