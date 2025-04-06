import { MdCheck } from "react-icons/md";

interface IPricingCardFeatureProps {
  features: string[];
  price: string;
}

function PricingCardFeature({ features, price }: IPricingCardFeatureProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-end gap-2 text-foreground/60">
        <h1 className="text-4xl text-foreground font-bold">${price}</h1>
        /month
      </div>
      <div></div>
      <div className="flex flex-col gap-4">
        {features.map((feature) => (
          <div key={feature} className="flex gap-3 items-center text-primary">
            <MdCheck size={20} />
            <h3 className="text-foreground">{feature}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PricingCardFeature;
