import React from "react";
import { useGetSocialMedia } from "../../_customHooks/useGetSocialMedia";

interface ICaptionAndPlatformDisplayProps {
  caption: string;
  user: string;
  platform: string;
}
function CaptionAndPlatformDisplay({
  caption,
  platform,
}: ICaptionAndPlatformDisplayProps) {
  const { color, icon } = useGetSocialMedia({ platform });

  return (
    <div className="flex items-center  gap-2">
      <h2 className="text-sm font-medium">{caption}</h2>
      <div
        className={`flex gap-1 font-medium items-center justify-center ${color}  px-2 py-1 rounded-full  w-fit text-xs`}
      >
        {icon} <span className="capitalize">{platform}</span>
      </div>
    </div>
  );
}

export default CaptionAndPlatformDisplay;
