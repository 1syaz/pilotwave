import connectDB from "@/lib/connectDB";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();
  const body = await request.json();
  const { fullname, email, password } = body;

  if (!fullname || !email || !password) {
    return new NextResponse(
      JSON.stringify({ error: "All fields are required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    return new NextResponse(
      JSON.stringify({
        message: "An account already exists with this email.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const user = await User.create({
    fullname,
    email,
    password,
  });

  if (!user) {
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong while creating the user" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return NextResponse.json(user);
}
