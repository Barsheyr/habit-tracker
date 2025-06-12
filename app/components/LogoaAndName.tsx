import React from "react";

const LogoAndName = () => {
  return (
    <div className="flex items-center gap-2">
      {/* Logo Box */}
      <div className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-lg font-semibold shadow-md">
        Arsheyr
      </div>

      {/* Tracker Text */}
      <span className="text-xl font-light text-black dark:text-gray-200 tracking-wide">
        Tracker
      </span>
    </div>
  );
};

export default LogoAndName;
