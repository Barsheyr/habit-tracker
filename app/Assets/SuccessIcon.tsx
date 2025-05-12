export function SuccessIcon({ color = `#3a38c5` }: { color: string }) {
  return (
    <svg
      className="h-32 w-32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M10 8.34315V14M10 14H15.5M10 14L18.364 5.63604M13.7568 3.17216C10.9096 2.60828 7.84251 3.42957 5.63604 5.63604C2.12132 9.15076 2.12132 14.8492 5.63604 18.364C9.15076 21.8787 14.8492 21.8787 18.364 18.364C20.5704 16.1575 21.3917 13.0904 20.8278 10.2432"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
}
