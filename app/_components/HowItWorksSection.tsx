import HowItWorksGuide from "./HowItWorksGuide";
import SectionHeader from "./SectionHeader";

function HowItWorksSection() {
  return (
    <section
      id="howItWorks"
      className="scroll-mt-15 text-foreground bg-background-secondary w-full  sm:px-10 px-4 py-16 flex flex-col gap-12 lg:items-center items-start justify-center"
    >
      <SectionHeader
        description="See how PostMaster helps you manage all your social media in one
          place."
        heading="Streamline Your Social Media Workflow"
        title="How It Works"
      />
      <HowItWorksGuide />
    </section>
  );
}

export default HowItWorksSection;
