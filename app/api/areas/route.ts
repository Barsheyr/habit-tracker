import connectToDB from "@/app/lib/connectToDB";
import { NextResponse } from "next/server";
import Area from "@/app/Models/AreaSchema";
// import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request) {
  try {
    await connectToDB();

    const { name, icon, clerkUserId } = await req.json();

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
    await connectToDB;
    const areas = await Area.find({ clerkUserId: clerkId });
    return NextResponse.json({ areas: areas });
  } catch (error) {
    console.log("error");
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
