import { Webhook } from "svix";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const headers = {
    "svix-id": req.headers.get("svix-id")!,
    "svix-timestamp": req.headers.get("svix-timestamp")!,
    "svix-signature": req.headers.get("svix-signature")!,
  };

  const secret = process.env.CLERK_WEBHOOK_SECRET || "";

  const wh = new Webhook(secret);

  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new NextResponse("Invalid webhook signature", { status: 400 });
  }

  const { type, data } = evt;

  console.log("Webhook event:", type);
  console.log("Data:", data);

  // Handle event types
  if (type === "user.created") {
    // Process the user.created event
  }

  return NextResponse.json({ received: true });
}
