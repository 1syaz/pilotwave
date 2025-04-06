interface IFeatureProps {
  heading: string;
  description: string;
  icon: React.ElementType;
}

function Feature({ description, heading, icon: Icon }: IFeatureProps) {
  return (
    <div className="flex  gap-4 justify-baseline ">
      <div className="text-primary bg-background-secondary h-12 w-12 rounded-lg flex items-center justify-center">
        <Icon size={25} />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <h3 className="font-semibold text-lg">{heading}</h3>
        <p className="text-foreground/60">{description}</p>
      </div>
    </div>
  );
}

export default Feature;
