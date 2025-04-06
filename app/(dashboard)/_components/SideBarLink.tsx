"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ISideBarLinkProps {
  item: {
    title: string;
    url: string;
    icon: React.ReactNode;
  };
}

function SideBarLink({ item }: ISideBarLinkProps) {
  const pathname = usePathname();

  const { icon: Icon, title, url } = item;

  return (
    <Link href={url} className=" w-full ">
      <div
        className={`w-full flex items-center gap-5 p-2 rounded-lg  ${
          title.toLowerCase() === pathname.split("/")[1]
            ? "bg-background-secondary text-primary "
            : "text-foreground/80 bg-white hover:bg-foreground/5"
        }  `}
      >
        {Icon}
        <span className="text-md font-medium">{title}</span>
      </div>
    </Link>
  );
}

export default SideBarLink;
