import PricingCard from "./PricingCard";
import SectionHeader from "./SectionHeader";

function PricingSection() {
  const pricing = [
    {
      plan: "Basic",
      price: "0",
      description:
        "Perfect for individuals and small businesses just getting started.",
      features: [
        "Unlimited social accounts",
        "Full access to posting & scheduling",
        "AI-powered management",
        "Advanced analytics dashboard",
        "1-day temporary storage",
      ],
    },
    {
      plan: "Pro",
      price: "29",
      description: "For growing businesses and professional creators.",
      features: [
        "Connect up to 2 social accounts",
        "Advanced scheduling & posting",
        "Full comment management",
        "Comprehensive analytics",
        "AI-powered comment replies",
        "3 weeks of storage",
      ],
    },
    {
      plan: "Buisness",
      price: "99",
      description: "For teams and organizations with advanced needs.",
      features: [
        "Unlimited social accounts",
        "Team collaboration tools",
        "Advanced analytics & reports",
        "AI-powered post & comment automation",
        "In-depth analytics & reporting",
        "Priority support",
        "2 months of storage",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="scroll-mt-15 text-foreground bg-background-secondary w-full  sm:px-10 px-4 py-16 flex flex-col gap-12 lg:items-center items-start justify-center"
    >
      <SectionHeader
        title="Pricing"
        heading="Start Simplifying Your Social Media Today"
        description="Choose the plan that fits your needs. No hidden fees, cancel anytime."
      />
      <section className="grid lg:grid-cols-3 grid-cols-1 gap-10  w-full   lg:max-w-[80rem]">
        {/* pricing card */}
        {pricing.map((card) => (
          <PricingCard key={card.plan} {...card} />
        ))}
      </section>
    </section>
  );
}

export default PricingSection;
