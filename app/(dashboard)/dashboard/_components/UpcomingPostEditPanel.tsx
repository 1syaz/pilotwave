"use client";

import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import dynamic from "next/dynamic";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { SlSocialFacebook } from "react-icons/sl";

type Platform = "instagram" | "facebook" | "x" | "linkedin";

interface IUpcomingPostEditPanelProps {
  platform: Platform[];
  caption: string;
  time: string;
  date: string;
}

const EditCreatePostDialog = dynamic(() => import("./EditCreatePostDialog"), {
  ssr: false,
});

function UpcomingPostEditPanel(props: IUpcomingPostEditPanelProps) {
  const { platform } = props;

  const icon = platform.map((platform, index) => {
    if (platform === "x") {
      return (
        <FaXTwitter
          key={`icon-${platform}-${index}`}
          size={15}
          style={{ color: "#000000" }}
        />
      );
    } else if (platform === "instagram") {
      return (
        <FaInstagram
          key={`icon-${platform}-${index}`}
          size={15}
          style={{ color: "var(--color-instagram)" }}
        />
      );
    } else if (platform === "facebook") {
      return (
        <SlSocialFacebook
          key={`icon-${platform}-${index}`}
          size={15}
          style={{ color: "var(--color-facebook)" }}
        />
      );
    } else {
      return (
        <FaLinkedin
          key={`icon-${platform}-${index}`}
          size={15}
          style={{ color: "var(--color-linkedin)" }}
        />
      );
    }
  });

  return (
    <div className="flex items-center  justify-between gap-2">
      <div className="flex gap-1 items-center">
        {icon.map((icon, index) => (
          <span key={index} className="text-facebook">
            {icon}
          </span>
        ))}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" size="sm" className="font-medium">
            Edit
          </Button>
        </DialogTrigger>
        <EditCreatePostDialog title="Edit Scheduled Post" {...props} />
      </Dialog>
    </div>
  );
}

export default UpcomingPostEditPanel;
