import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContextProvider } from "@/app/contextApi";
import { AreaType } from "@/app/Types/GlobalTypes";

export default function AreaContainer() {
  const { allAreasObject, selectedAreaStringObject } =
    useGlobalContextProvider();
  const { allAreas } = allAreasObject;
  const { setSelectedAreaString } = selectedAreaStringObject;
  // state to keep track of selected areas
  const [selectedAreas, setSelectedAreas] = useState<{
    [key: number]: boolean;
  }>({});

  // function to toggle selection
  const toggleSelection = (index: number) => {
    // copy all selectedArea object to ensure immutability
    const selectedAreasCopy = { ...selectedAreas };

    // make all the indexes in the selectedAreasCopy false
    Object.keys(selectedAreasCopy).forEach((key) => {
      selectedAreasCopy[parseInt(key)] = false;
    });
    // only set the index in the selectedAreaCopy false
    selectedAreasCopy[index] = true;

    setSelectedAreaString(allAreas[index].name);

    // update the selected area state
    setSelectedAreas(selectedAreasCopy);
  };

  useEffect(() => {
    const initialSelectedArea: { [key: number]: boolean } = {};

    allAreas.forEach((_, index) => {
      initialSelectedArea[index] = false;
    });

    initialSelectedArea[0] = true;
  }, [allAreas]);

  return (
    <div className="p-5 bg-white rounded-md flex gap-3 items-center transition-all mt-5 text-sm">
      {allAreas.map((area: AreaType, index) => (
        <div onClick={() => toggleSelection(index)} key={index}>
          <SingleAreaContainer
            singleArea={area}
            isSelected={selectedAreas[index]}
          />
        </div>
      ))}
    </div>
  );

  function SingleAreaContainer({
    singleArea,
    isSelected,
  }: {
    singleArea: AreaType;
    isSelected: boolean;
  }) {
    return (
      <div
        className={`p-2 rounded-md flex gap-1 items-center cursor-pointer ${
          isSelected ? "bg-blue-500 text-white" : "text-gray-400"
        }`}
      >
        <FontAwesomeIcon icon={singleArea.icon} />
        <span> {singleArea.name} </span>
      </div>
    );
  }
}
