import Image, { StaticImageData } from "next/image";
import CaptionAndPlatformDisplay from "./CaptionAndPlatformDisplay";
import { BiComment } from "react-icons/bi";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import dynamic from "next/dynamic";

const DynamicCommentReplyDialog = dynamic(
  () => import("./CommentReplyDialog"),
  {
    ssr: false,
  }
);

interface IRecentActivityCardProps {
  caption: string;
  postThumbnail: StaticImageData;
  comment: string;
  user: string;
  userImage: StaticImageData;
  timeAgo: string;
  platform: string;
}

function RecentCommentCard(props: IRecentActivityCardProps) {
  const {
    caption,
    postThumbnail,
    comment,
    user,
    // userImage,
    timeAgo,
    platform,
  } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="border-t border-foreground/10 p-4 flex items-start gap-5 cursor-pointer group">
          <div className="rounded-lg overflow-hidden h-12 w-12">
            <Image
              src={postThumbnail}
              alt="user"
              width={50}
              height={50}
              className="object-cover "
            />
          </div>
          <div className="flex flex-col flex-1 gap-1">
            <CaptionAndPlatformDisplay
              caption={caption}
              user={user}
              platform={platform}
            />
            <div className="flex items-start gap-2 text-wrap ">
              <h4 className="text-sm font-medium  ">
                {user}: <span className="text-sm font-light ">{comment}</span>
              </h4>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-foreground/50">{timeAgo}</span>
              <div className="text-foreground/70 flex  items-center text-xs gap-1 font-medium transition-colors duration-300 group-hover:text-primary">
                <BiComment /> Reply
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DynamicCommentReplyDialog {...props} />
    </Dialog>
  );
}

export default RecentCommentCard;
