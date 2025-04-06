"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import RecentCommentCard from "./RecentCommentCard";
import image from "@/public/testimonials/image1.jpeg";

function RecentComments() {
  const recentComments = [
    {
      caption: "Summer collection launch announcement",
      postThumbnail: image,
      comment:
        "activity Love the new collection! Will these be available internationally?",
      user: "Sarah Johnson",
      userImage: image,
      timeAgo: "2 minutes ago",
      platform: "instagram",
    },
    {
      caption: "Product Launch Announcement",
      postThumbnail: image,
      comment:
        "activity Love the new collection! Will these be available internationally?",
      user: "Sarah Johnson",
      userImage: image,
      timeAgo: "2 minutes ago",
      platform: "facebook",
    },
    {
      caption: "Behind the scenes photoshoot",
      postThumbnail: image,
      comment:
        "activity Love the new collection! Will these be available internationally?",
      user: "Sarah Johnson",
      userImage: image,
      timeAgo: "2 minutes ago",
      platform: "x",
    },
  ];

  const [viewAll, setViewAll] = useState<boolean>(false);

  return (
    <div className="lg:col-span-2 col-span-1 bg-white    rounded-lg shadow-sm border border-foreground/2 shadow-gray-400/30">
      <h3 className="font-semibold text-lg capitalize p-4">Recent Comments</h3>
      <div>
        {recentComments.map((comment, index) => (
          <RecentCommentCard key={index} {...comment} />
        ))}
      </div>
      <Button variant="link" onClick={() => setViewAll(!viewAll)}>
        {viewAll ? "View Less" : "View More"}
      </Button>
    </div>
  );
}

export default RecentComments;
