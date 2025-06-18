/* eslint-disable @typescript-eslint/no-explicit-any */
import connectToDB from "@/app/lib/connectToDB";
import { NextResponse } from "next/server";
import Area from "@/app/Models/AreaSchema";
// import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request) {
  try {
    await connectToDB();

    const { name, icon, clerkUserId } = await req.json();

    // ✅ Explicit validation
    if (!clerkUserId) {
      return NextResponse.json(
        { error: "clerkUserId is required" },
        { status: 400 }
      );
    }

    const area = new Area({
      name,
      icon,
      clerkUserId,
    });

    const savedArea = await area.save();

    return NextResponse.json({ area: savedArea });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function GET(req: any) {
  try {
    const clerkId = req.nextUrl.searchParams.get("clerkId");
    await connectToDB();
    const areas = await Area.find({ clerkUserId: clerkId });
    return NextResponse.json({ areas: areas });
  } catch (error) {
    console.log("error");
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function DELETE(request: any) {
  try {
    const { areaId } = await request.json(); // get the projectId from the request body
    // get clerkId from the query parameters

    const areaToDelete = await Area.findOneAndDelete({
      _id: areaId,
    });

    if (!areaToDelete) {
      return NextResponse.json({ message: "Area not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Area deleted successfully" });
  } catch (error) {
    console.log("error");
    return NextResponse.json({ message: error });
  }
}

export async function PUT(request: any) {
  try {
    const areaId = request.nextUrl.searchParams.get("areaId");
    const { name, icon } = await request.json();
    if (!areaId) {
      return NextResponse.json(
        { message: "Habit ID is required" },
        { status: 400 }
      );
    }

    await connectToDB();

    // find update
    const updatedArea = await Area.findOneAndUpdate(
      { _id: areaId },
      {
        $set: {
          name,
          icon,
        },
      },
      { returnDocument: "after" }
    );

    console.log(updatedArea);

    return NextResponse.json({
      message: "Area has been updated successfully",
      area: updatedArea.value,
    });
  } catch (error) {
    console.log("Error updating area:", error);
    return NextResponse.json(
      { message: "An error occurred while updating the area" },
      { status: 500 }
    );
  }
}
