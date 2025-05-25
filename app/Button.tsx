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
  let defaultClass =
    "flex items-center justify-center gap-2 p-3 rounded-md w-full";

  // Determine the color class
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
    case "Gray":
      break;
    default:
      colorClass = "bg-slate-300";
      break;
  }

  // Determine the size class
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
  // Plus icon
  const PlusIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox=" 0 0 20 20"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );

  // Home Icon
  const HomeIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox=" 0 0 20 20"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}
