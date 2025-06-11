import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  color?: "Gray" | "Yellow" | "Red" | "Orange";
  size?: "small" | "medium" | "large";
  icon?:
    | "plus"
    | "minus"
    | "check"
    | "close"
    | "menu"
    | "Search"
    | "home"
    | "settings"
    | "user";
}

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
    className="w-4 h-4"
  >
    <path
      fillRule="evenodd"
      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
      clipRule="evenodd"
    />
  </svg>
);

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
    className="w-4 h-4"
  >
    <path d="M10 2L2 9h2v9h5v-6h2v6h5V9h2L10 2z" />
  </svg>
);

// Add more icons as needed...

export default function Button({
  className = "",
  onClick,
  size = "medium",
  color = "Gray",
  icon,
  ...rest
}: ButtonProps) {
  let colorClass = "";
  let sizeClass = "";
  const defaultClass =
    "flex items-center justify-center gap-2 rounded-md w-full";

  switch (color) {
    case "Yellow":
      colorClass = "bg-yellow-500";
      break;
    case "Red":
      colorClass = "bg-red-500";
      break;
    case "Orange":
      colorClass = "bg-orange-500";
      break;
    default:
      colorClass = "bg-slate-300";
      break;
  }

  switch (size) {
    case "small":
      sizeClass = "px-2 py-1 text-sm";
      break;
    case "medium":
      sizeClass = "p-4 text-base";
      break;
    case "large":
      sizeClass = "px-6 py-3 text-lg";
      break;
    default:
      sizeClass = "px-4 py-2 text-base";
      break;
  }

  let iconComponent: React.ReactNode = null;
  switch (icon) {
    case "plus":
      iconComponent = <PlusIcon />;
      break;
    case "home":
      iconComponent = <HomeIcon />;
      break;
    // Add other icons here...
  }

  return (
    <button
      onClick={onClick}
      className={`${defaultClass} ${colorClass} ${sizeClass} ${className}`}
      {...rest}
    >
      {iconComponent}
      {rest.children}
    </button>
  );
}
