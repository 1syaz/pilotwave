import { Button } from "./ui/button";
import PricingCardFeature from "./PricingCardFeature";

interface IPricingCardProps {
  plan: string;
  price: string;
  description: string;
  features: string[];
}

function PricingCard({
  plan,
  price,
  features,
  description,
}: IPricingCardProps) {
  return (
    <div
      className={`${
        plan === "Pro"
          ? "border-primary border-2 relative"
          : "border-foreground/20 border"
      } flex flex-col gap-10 justify-between bg-white p-8   rounded-lg `}
    >
      <div className="flex flex-col gap-5">
        {plan === "Pro" && (
          <div className="bg-primary w-fit px-3 py-1 uppercase absolute top-0 right-0 rounded-bl-lg">
            <h1 className="text-sm font-semibold text-white">Best Value</h1>
          </div>
        )}
        <h2 className="text-xl font-semibold">{plan}</h2>
        <p className="text-md text-foreground/60">{description}</p>
        <PricingCardFeature features={features} price={price} />
      </div>
      <Button
        className="self-stretch cursor-not-allowed"
        variant={plan === "Pro" ? "default" : "secondary"}
      >
        Enjoy Free Access for Now!
      </Button>
    </div>
  );
}

export default PricingCard;
