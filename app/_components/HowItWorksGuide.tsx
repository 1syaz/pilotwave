"use client";

import { useState } from "react";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { LuPenTool } from "react-icons/lu";
import { TbBrandGoogleAnalytics } from "react-icons/tb";

type HowItWorksNav = "posts" | "comments" | "analytics" | "settings";

function HowItWorksGuide() {
  const [activeNav, setActiveNav] = useState<HowItWorksNav>("posts");

  const howItWorksNav = [
    {
      heading: "Create Posts",
      value: "posts",
      icon: LuPenTool,
    },
    {
      heading: "Manage Comments",
      value: "comments",
      icon: FaRegCommentAlt,
    },
    {
      heading: "View Analytics",
      value: "analytics",
      icon: TbBrandGoogleAnalytics,
    },
    {
      heading: "Settings",
      value: "settings",
      icon: IoSettingsOutline,
    },
  ];

  return (
    <section className=" w-full lg:max-w-[80rem] flex lg:flex-row flex-col gap-5">
      {/* how it works nav section */}
      <div className=" lg:w-[300px] w-full flex flex-col gap-2 text-foreground/70">
        {howItWorksNav.map((Nav) => (
          <button
            onClick={() => setActiveNav(Nav.value as HowItWorksNav)}
            key={Nav.heading}
            className={`${
              activeNav === Nav.value
                ? "bg-primary hover:bg-none text-white"
                : "hover:bg-white"
            } rounded-lg  w-full cursor-pointer text-sm font-medium flex items-center gap-3 px-3 py-2`}
          >
            <Nav.icon size={18} /> {Nav.heading}
          </button>
        ))}
      </div>
      {/* how it works section */}
      <div className="border flex-1 bg-white">right</div>
    </section>
  );
}

export default HowItWorksGuide;
