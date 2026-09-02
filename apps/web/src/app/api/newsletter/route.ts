import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string };
  if (!body.email?.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }
  return NextResponse.json({ success: true, message: "Subscribed successfully" });
}
