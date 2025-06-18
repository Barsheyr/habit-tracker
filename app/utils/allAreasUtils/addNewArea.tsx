// import { iconToText } from "@/app/Pages/AllHabits/components/IconWindow/IconData";
// import { AreaType } from "@/app/Types/GlobalTypes";
// import { IconProp } from "@fortawesome/fontawesome-svg-core";
// import { Dispatch } from "react";
// import { SetStateAction } from "react";
// import toast from "react-hot-toast";
// import { auth } from "@clerk/nextjs"; // Add this import

// export default async function addNewArea({
//   areaItem,
//   allAreas,
//   setAllAreas,
// }: {
//   areaItem: Omit<AreaType, "_id">;
//   allAreas: AreaType[];
//   setAllAreas: React.Dispatch<React.SetStateAction<AreaType[]>>;
// }) {
//   try {
//     // Get the current user's ID
//     const { userId } = auth();
//     // Convert the icon
//     const { icon } = areaItem;
//     const areaIconText = iconToText(icon as IconProp);

//     // Update the icon to text and add clerkUserId
//     const updatedArea = {
//       ...areaItem,
//       icon: areaIconText,
//       clerkUserId: userId,
//     };

//     try {
//       const response = await fetch("/api/areas", {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },

//         body: JSON.stringify(updatedArea),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to add habit");
//       }

//       // Extract the _id from the response
//       const data = await response.json();
//       const { _id } = data.area;

//       // Update the _id of the area
//       const updatedIdOfArea = { ...areaItem, _id: _id };

//       // Add the updated habit to the allHabits array

//       setAllAreas([...allAreas, updatedIdOfArea]);

//       toast.success("Area has been added successfully ");
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong!");
//     }
//   } catch (error) {
//     console.log(error);
//     toast.error("Something went wrong!");
//   }
// }

import { iconToText } from "@/app/Pages/AllHabits/components/IconWindow/IconData";
import { AreaType } from "@/app/Types/GlobalTypes";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import toast from "react-hot-toast";

export default async function addNewArea({
  areaItem,
  allAreas,
  setAllAreas,
  clerkUserId, // Add this parameter
}: {
  areaItem: Omit<AreaType, "_id">;
  allAreas: AreaType[];
  setAllAreas: React.Dispatch<React.SetStateAction<AreaType[]>>;
  clerkUserId: string; // Add this type
}) {
  try {
    // Validate that clerkUserId is provided
    if (!clerkUserId) {
      toast.error("User ID is required");
      return;
    }

    // Convert the icon
    const { icon } = areaItem;
    const areaIconText = iconToText(icon as IconProp);

    // Update the icon to text and include clerkUserId
    const updatedArea = {
      ...areaItem,
      icon: areaIconText,
      clerkUserId: clerkUserId, // Add the user ID here
    };

    console.log("Sending area data:", updatedArea); // Debug log

    try {
      const response = await fetch("/api/areas", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedArea),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Server error:", errorData);
        throw new Error(`Failed to add area: ${response.status}`);
      }

      // Extract the _id from the response
      const data = await response.json();
      const { _id } = data.area;

      // Update the _id of the area
      const updatedIdOfArea = { ...areaItem, _id: _id };

      // Add the updated area to the allAreas array
      setAllAreas([...allAreas, updatedIdOfArea]);

      toast.success("Area has been added successfully");
    } catch (error) {
      console.error("Error adding area:", error);
      toast.error("Something went wrong!");
    }
  } catch (error) {
    console.error("Error in addNewArea:", error);
    toast.error("Something went wrong!");
  }
}
