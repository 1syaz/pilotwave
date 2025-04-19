import connectDB from "@/lib/connectDB";
import { User } from "@/models/user";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    const token = req.cookies.get("linkedin_access_token");

    if (token) {
      return new NextResponse(
        JSON.stringify({ message: "You're already signed in with LinkedIn!" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const authToken = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!authToken) {
      console.error("No session found");
      return NextResponse.redirect(new URL("/login", req.url));
    }
    const userEmail = authToken.email;

    try {
      const url = new URL(req.url);
      const code = url.searchParams.get("code");

      const params = new URLSearchParams({
        grant_type: "authorization_code",
        code: code!,
        client_id: process.env.LINKEDIN_CLIENT_ID!,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
        redirect_uri: process.env.REDIRECT_URI!,
      });

      const response = await fetch(
        "https://www.linkedin.com/oauth/v2/accessToken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        }
      );

      const linkedinData = await response.json();
      const accessToken = linkedinData.access_token;
      const expiryIn = linkedinData.expires_in; // seconds until expiration

      const expiryDate = new Date(Date.now() + expiryIn * 1000);
      let personURN;
      try {
        const response = await fetch("https://api.linkedin.com/v2/userinfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Restli-Protocol-Version": "2.0.0",
          },
        });

        const { sub } = await response.json();
        personURN = sub;
      } catch (error) {
        console.error("Error while getting linkedin user info", error);

        return new NextResponse(
          JSON.stringify({ error: "Failed to get linkedin user info" }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      try {
        connectDB();

        const existingUser = await User.findOne({ email: userEmail });

        if (!existingUser) {
          console.error("User not found");
          return NextResponse.redirect(new URL("/login", req.url));
        }

        const existingLinkedinIndex = existingUser.connectedAccounts.findIndex(
          (account) => account.provider.includes("linkedin")
        );
        let updateOperation;

        if (!existingLinkedinIndex) {
          updateOperation = {
            $push: {
              connectedAccounts: {
                provider: "linkedin",
                author: `urn:li:person:${personURN}`,
                expiresIn: expiryIn,
              },
            },
          };
        } else {
          updateOperation = {
            $set: {
              [`connectedAccounts.${existingLinkedinIndex}.expiresIn`]:
                expiryIn,
              [`connectedAccounts.${existingLinkedinIndex}.author`]: "asd",
            },
          };
        }

        await User.findOneAndUpdate(
          {
            email: userEmail,
          },
          updateOperation,
          {
            new: true,
          }
        );
      } catch (error) {
        console.log("Error while updating user", error);

        return new NextResponse(
          JSON.stringify({ error: "Failed to update database user" }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      const res = NextResponse.redirect(new URL("/dashboard", req.url));

      if (accessToken) {
        res.cookies.set({
          name: "linkedin_access_token",
          value: accessToken,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          expires: expiryDate,
          path: "/",
        });
      }

      return res;
    } catch (error) {
      console.error("Error during token exchange:", error);
      return new NextResponse(
        JSON.stringify({
          error: "Failed to exchange authorization code for token",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } else {
    return new NextResponse(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }
}
