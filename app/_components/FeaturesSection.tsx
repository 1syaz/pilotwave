import { LuLayoutDashboard, LuSend } from "react-icons/lu";
import Feature from "./Feature";
import { MdOutlineModeComment } from "react-icons/md";
import { GoHubot } from "react-icons/go";
import { FaRegClock, FaSuperpowers } from "react-icons/fa6";
import SectionHeader from "./SectionHeader";

function FeaturesSection() {
  const features = [
    {
      heading: "Post to Multiple Platforms",
      description:
        "Create and schedule posts for all your social media channels from a single dashboard.",
      icon: LuSend,
    },
    {
      heading: "Unified Comment Management",
      description:
        "View and respond to comments from all platforms in one organized inbox.",
      icon: MdOutlineModeComment,
    },
    {
      heading: "Analytics Dashboard",
      description:
        "Track performance across platforms with comprehensive, easy-to-read analytics.",
      icon: LuLayoutDashboard,
    },
    {
      heading: "Smart Scheduling",
      description:
        "Automatically post at optimal times for maximum engagement.",
      icon: FaRegClock,
    },
    {
      heading: "Smart Replies",
      description: "Generates instant, context-aware comments from AI.",
      icon: GoHubot,
    },
    {
      heading: "AI-Powered Post",
      description:
        "Generate engaging captions, hashtags, and post content instantly.",
      icon: FaSuperpowers,
    },
  ];

  return (
    <section
      id="features"
      className="scroll-mt-15 text-foreground bg-white w-full  sm:px-10 px-4 py-16 flex flex-col gap-12 lg:items-center items-start justify-center"
    >
      <SectionHeader
        heading="Everything You Need to Master PilotWave"
        title="Features"
        description="Simplify your social media workflow with powerful tools designed for efficiency and results."
      />
      <div className="w-full lg:max-w-[80rem]  grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-10 gap-8 ">
        {features.map((feature, index) => (
          <Feature key={index} {...feature} />
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
