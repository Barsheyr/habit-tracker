import { useGlobalContextProvider } from "@/app/contextApi";

export function ConfirmationWindow() {
  const { openConfirmationWindow, setOpenConfirmationWindow } =
    useGlobalContextProvider();
  return (
    <div
      style={{
        left: "0",
        right: "0",
        marginLeft: "auto",
        marginRight: "auto",
        top: "30%",
        transform: "translateY(-50%)",
      }}
      className={`shadow-md rounded-md md:w-[450px] bg-white py-8 pt-10 p-4 z-50 flex flex-col gap-2 items-center ${
        openConfirmationWindow ? "fixed" : "hidden"
      }`}
    >
      <span className="font-bold text-xl">{`Are you sure`}</span>
      <span className="text-center text-[13px] opacity-75">
        Are you sure you want to deleted this item? <br /> This action cannot be
        undone
      </span>
      <div className="flex gap-2 mt-5">
        <button
          className="border text-[13px] w-full px-10 p-3 rounded-md"
          onClick={() => setOpenConfirmationWindow(false)}
        >
          Cancel
        </button>
        <button
          className={`w-full px-10 text-[13px] p-3 text-white rounded-md bg-red-500`}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
