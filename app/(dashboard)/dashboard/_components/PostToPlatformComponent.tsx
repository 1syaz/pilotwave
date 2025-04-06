"use client";

import { Button } from "@/app/_components/ui/button";

type Platform = "instagram" | "facebook" | "x" | "linkedin";

interface IPostToPlatformComponentProps {
  selectedPlatforms: Platform[];
  setSelectedPlatforms: (arg: Platform[]) => void;
}

function PostToPlatformComponent({
  selectedPlatforms,
  setSelectedPlatforms,
}: IPostToPlatformComponentProps) {
  const platforms: Platform[] = ["facebook", "x", "linkedin", "instagram"];

  const selectPlatform = (platform: Platform) => {
    const newPlatforms = selectedPlatforms.includes(platform)
      ? selectedPlatforms.filter((p) => p !== platform)
      : [...selectedPlatforms, platform];

    setSelectedPlatforms(newPlatforms);
  };

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-foreground/80 font-medium text-sm">
        Post to Platforms
      </h4>
      <div className="grid grid-cols-2 gap-2 ">
        {platforms.map((platform, index) => (
          <Button
            key={index}
            onClick={() => selectPlatform(platform as Platform)}
            variant="outline"
            className={`${
              selectedPlatforms?.includes(platform as Platform) &&
              "bg-foreground/20"
            } capitalize font-medium text-foreground/70 border-foreground/20`}
          >
            {platform}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default PostToPlatformComponent;
