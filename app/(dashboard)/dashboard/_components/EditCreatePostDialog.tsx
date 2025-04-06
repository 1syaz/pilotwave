import { Button } from "@/app/_components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { HiOutlineUpload } from "react-icons/hi";

import { IoClose } from "react-icons/io5";
import { Textarea } from "@/app/_components/ui/textarea";
import { BsRobot } from "react-icons/bs";
import FileUploadComponent from "./FileUploadComponent";
import PostToPlatformComponent from "./PostToPlatformComponent";
import SheduleComponent from "./SheduleComponent";
import { useState } from "react";

type Platform = "instagram" | "facebook" | "x" | "linkedin";

interface IEditCreatepostDialogProps {
  title: string;
  caption?: string;
  time?: string;
  date?: string;
  platform?: Platform[];
}

function EditCreatePostDialog({
  title,
  caption,
  //   date,
  platform,
}: //   time,
IEditCreatepostDialogProps) {
  const [captionInput, setCaptionInput] = useState(caption ?? "");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(
    platform!
  );

  return (
    <DialogContent className="[&>button]:hidden md:max-w-[655px] max-h-[calc(100vh-2rem)] overflow-auto ">
      <DialogHeader className=" flex-row items-center justify-between">
        <div className="flex  items-center gap-2">
          <DialogTitle className="">{title}</DialogTitle>
        </div>
        <DialogClose asChild>
          <Button type="button" size="sm" variant="secondary">
            <IoClose />
          </Button>
        </DialogClose>
      </DialogHeader>
      <section className="p-4 flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <h4 className="text-foreground/80 font-medium text-sm">
            Post Content
          </h4>
          <div className="relative w-full">
            <Textarea
              value={captionInput}
              onChange={(e) => setCaptionInput(e.target.value)}
              placeholder="Type your message here."
              className=" min-h-[150px] max-h-[200px] md:max-w-[620px] max-w-[calc(100vw-4rem)]  resize-y text-sm"
            />
            <span className="absolute right-2  bottom-2 text-foreground/50 cursor-pointer hover:text-primary transition-colors duration-300 bg-white p-1 rounded-md">
              <BsRobot size={22} />
            </span>
          </div>
        </div>{" "}
        <FileUploadComponent />
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          <PostToPlatformComponent
            selectedPlatforms={selectedPlatforms}
            setSelectedPlatforms={setSelectedPlatforms}
          />
          <SheduleComponent />
        </div>
      </section>
      <DialogFooter className="flex items-center justify-end">
        <DialogClose asChild>
          <Button variant="secondary" type="button">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" size="icon">
          <HiOutlineUpload />
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

export default EditCreatePostDialog;
