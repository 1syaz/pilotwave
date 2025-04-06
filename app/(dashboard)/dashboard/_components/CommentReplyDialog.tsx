import { Button } from "@/app/_components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import Image, { StaticImageData } from "next/image";
import { LuSend } from "react-icons/lu";
import { Input } from "@/app/_components/ui/input";
import { BsRobot } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useGetSocialMedia } from "../../_customHooks/useGetSocialMedia";

interface ICommentReplyDialog {
  caption: string;
  postThumbnail: StaticImageData;
  comment: string;
  user: string;
  userImage: StaticImageData;
  timeAgo: string;
  platform: string;
}

function CommentReplyDialog({
  caption,
  userImage,
  comment,
  platform,
  postThumbnail,
  timeAgo,
  user,
}: ICommentReplyDialog) {
  const { color, icon } = useGetSocialMedia({ platform });
  return (
    <DialogContent className="[&>button]:hidden md:max-w-[655px] max-h-[calc(100vh-2rem)] overflow-auto ">
      <DialogHeader className=" flex-row items-center justify-between">
        <div className="flex  items-center gap-2">
          <div
            className={`px-2 py-1  text-sm flex items-center gap-2 ${color}  rounded-full`}
          >
            {icon} {platform}
          </div>
          <DialogTitle className="">Comment</DialogTitle>
        </div>
        <DialogClose asChild>
          <Button type="button" size="sm" variant="secondary">
            <IoClose />
          </Button>
        </DialogClose>
      </DialogHeader>
      <div className="flex lg:flex-row flex-col  gap-4 py-4 px-4 overflow-auto">
        <div className="lg:w-[250px] w-full lg:h-[140px] sm:h-[350px] h-[200px]  relative rounded-lg overflow-hidden">
          <Image src={postThumbnail} alt="user" fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <div>
            <h4 className="text-foreground/60 font-medium text-sm">Post</h4>
            <h2 className="font-medium text-lg">{caption}</h2>
          </div>
          <h4 className="text-foreground/60 font-medium text-sm">Comment</h4>
          {/* user comment */}
          <div className="flex items-start gap-2 h-full ">
            <div className=" relative w-10 h-10 rounded-full overflow-hidden">
              <Image src={userImage} alt="user" fill className="object-cover" />
            </div>
            <div className="flex-1 max-h-[200px] overflow-auto ">
              <div className="flex items-end text-sm gap-2 text-wrap">
                <h4 className="font-semibold text-nowrap">{user}</h4>
                <span className="text-xs font-semibold text-foreground/50 text-nowrap">
                  {timeAgo}
                </span>
              </div>
              <p className="text-sm text-foreground/80">{comment}</p>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter>
        <div className="w-full relative">
          <Input placeholder="Reply to this comment..." />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 cursor-pointer hover:text-primary transition-colors duration-300">
            <BsRobot size={22} />
          </span>
        </div>
        <Button type="submit" size="icon">
          <LuSend />
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

export default CommentReplyDialog;
