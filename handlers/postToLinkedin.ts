import { PostSchema } from "@/lib/schemas";
import { IConnectedAccounts } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function postToLinkedIn(
  req: NextRequest,
  account: IConnectedAccounts,
  body: z.infer<typeof PostSchema>
) {
  const linkedinToken = req.cookies.get("linkedin_access_token");

  if (!body.media) {
    const postBody = {
      author: account.author,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: body.postContent,
          },
          shareMediaCategory: "NONE",
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    };

    // --- create post
    try {
      const postResponse = await fetch("https://api.linkedin.com/v2/ugcPosts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${linkedinToken?.value}`,
          "X-Restli-Protocol-Version": "2.0.0",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody),
      });

      const postData = await postResponse.json();

      if (!postResponse.ok) {
        const error = await postResponse.text();

        console.error("LinkedIn API error:", postResponse.status, error);
        return new NextResponse(
          JSON.stringify({ message: "Failed to create post", error: postData }),
          {
            status: postResponse.status,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    } catch (error) {
      console.error("Error posting to LinkedIn:", error);
      return new NextResponse(
        JSON.stringify({ message: "Error connecting to linkedin API" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } else {
    const binaryFile = await body.media.arrayBuffer();
    const mediaType = body.media.type.split("/")[0];

    const registerMediaPostBody = {
      registerUploadRequest: {
        recipes: [`urn:li:digitalmediaRecipe:feedshare-${mediaType}`],
        owner: account.author,
        serviceRelationships: [
          {
            relationshipType: "OWNER",
            identifier: "urn:li:userGeneratedContent",
          },
        ],
      },
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    let uploadUrl;
    let asset;

    // --- register media
    try {
      const registerMediaResponse = await fetch(
        "https://api.linkedin.com/v2/assets?action=registerUpload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${linkedinToken?.value}`,
            "X-Restli-Protocol-Version": "2.0.0",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerMediaPostBody),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!registerMediaResponse.ok) {
        const errorBody = await registerMediaResponse.text();
        console.error(
          `LinkedIn API Error: ${registerMediaResponse.status} ${registerMediaResponse.statusText}`,
          errorBody
        );
        throw new Error(
          `LinkedIn API request failed with status ${registerMediaResponse.status}`
        );
      }

      const registerMediaResponseData = await registerMediaResponse.json();

      asset = registerMediaResponseData.value.asset;
      uploadUrl =
        registerMediaResponseData.value.uploadMechanism[
          "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
        ]?.uploadUrl;
    } catch (error) {
      console.error(error);
      return new NextResponse(
        JSON.stringify({ error: "Failed to register media on linkedin" }),
        {
          status: 500,
          headers: {
            "Application-Type": "application/json",
          },
        }
      );
    }

    // --- upload media
    await fetch(`${uploadUrl}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${linkedinToken?.value}`,
        "X-Restli-Protocol-Version": "2.0.0",
      },

      body: new Uint8Array(binaryFile),
    });

    const postBody = {
      author: account.author,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: body.postContent,
          },
          shareMediaCategory: "IMAGE",
          media: [
            {
              status: "READY",
              description: {
                text: "Center stage!",
              },
              media: asset,
              title: {
                text: body.media.name,
              },
            },
          ],
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    };

    // --- create post
    try {
      const postResponse = await fetch("https://api.linkedin.com/v2/ugcPosts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${linkedinToken?.value}`,
          "X-Restli-Protocol-Version": "2.0.0",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody),
      });

      const postResponseData = await postResponse.json();

      if (!postResponse.ok) {
        const error = await postResponse.text();

        console.error("LinkedIn API error:", postResponse.status, error);
        return new NextResponse(
          JSON.stringify({
            message: "Failed to create post",
            error: postResponseData,
          }),
          {
            status: postResponse.status,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    } catch (error) {
      console.error("Error posting to LinkedIn:", error);
      return new NextResponse(
        JSON.stringify({ message: "Error connecting to linkedin API" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }
}
