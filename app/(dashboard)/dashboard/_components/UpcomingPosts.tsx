import UpComingPostCard from "./UpComingPostCard";

type Platform = "instagram" | "facebook" | "x" | "linkedin";

function UpcomingPosts() {
  const tempUpComingPosts = [
    {
      caption:
        "Excited to announce our summer collection is now available! Check out our website for more details.",
      date: "today",
      time: "2:30 PM",
      platform: ["instagram", "facebook", "x"] as Platform[],
    },
    {
      caption:
        "Behind the scenes look at our latest photoshoot. #BehindTheScenes #NewCollection",
      date: "tommorrow",
      time: "10:00 AM",
      platform: ["facebook", "x"] as Platform[],
    },
  ];

  return (
    <div className="bg-white  rounded-lg shadow-sm border border-foreground/2 shadow-gray-400/30">
      <h3 className="font-semibold text-lg capitalize p-4">upcoming post</h3>
      <div>
        {tempUpComingPosts.map((post, index) => (
          <UpComingPostCard key={index} {...post} />
        ))}
      </div>
    </div>
  );
}

export default UpcomingPosts;
