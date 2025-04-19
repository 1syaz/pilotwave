import connectDB from "@/lib/connectDB";
import { platformStrategies } from "@/lib/platformStrategies";
import { PostSchema } from "@/lib/schemas";
import { User } from "@/models/user";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const reqForFromData = req.clone();
  const formData = await reqForFromData.formData();
  await connectDB();

  const platforms = JSON.parse(formData.get("platforms") as string);
  const postContent = formData.get("postContent");
  const media = formData.get("media");
  const schedule = formData.get("schedule");

  const body = {
    platforms,
    postContent,
    media,
    schedule: new Date(schedule as string),
  };

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const parsedBody = PostSchema.safeParse(body);
  if (!parsedBody.success) {
    const error = parsedBody.error.errors.map((err) => err.message).join(", ");
    console.log(error);
    return new NextResponse(JSON.stringify({ message: error }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const user = await User.findOne({ email: token.email });

  // handle posts to social media
  parsedBody.data.platforms.forEach((platform) => {
    const handler =
      platformStrategies[platform as keyof typeof platformStrategies];

    const account = user?.connectedAccounts.find((acc) =>
      acc.provider.includes(platform)
    );

    if (!account) {
      return new NextResponse(
        JSON.stringify({
          message: `No connected account found for ${platform}`,
        }),
        {
          status: 404,
          headers: {
            "Application-Type": "application/json",
          },
        }
      );
    }

    handler(req, account, parsedBody.data);
  });

  return new NextResponse(
    JSON.stringify({ message: "Post created successfully" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
