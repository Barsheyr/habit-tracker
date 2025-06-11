import React from "react";

const LogoaAndName = () => {
  const defaultColor = "#0407d9";
  const backgroundColorObject = { backgroundColor: defaultColor };

  return (
    <div className="flex gap-2 items-center">
      <div className="text-2xl flex font-light">
        <span className="flex items-center gap-2 font-light">
          <div
            style={backgroundColorObject}
            className="text-white rounded-md p-2 text-center"
          >
            Arsheyr
          </div>
          <span className="font-light"> Tracker </span>
        </span>
      </div>
    </div>
  );
};

export default LogoaAndName;
