import React from "react";

const Areas = () => {
  return (
    <div>
      <div className="w-full flex">
        <div className="w-[80%] m-5">
          <AllAreasTopBar />
        </div>

        <RightSideBar />
      </div>
    </div>
  );
};

export default Areas;

function AllAreasTopBar() {
  return (
    <div className="bg-white p-5 rounded-md FLEX justify-between">
      <div className="flex flex-col">
        <span className="text-xl">
          <span className="font-bold"> Hi There </span>
          <span className=" font-light"> Ali </span>
        </span>

        <span className="font-light text-[12px] text-gray-400">
          welcome back!!
        </span>
      </div>
    </div>
  );
}

function RightSideBar() {}
