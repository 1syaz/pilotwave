import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("linkedin_access_token");

  if (token?.value) {
    return NextResponse.json({ loggedIn: true });
  }

  return NextResponse.json({ loggedIn: false });
}
