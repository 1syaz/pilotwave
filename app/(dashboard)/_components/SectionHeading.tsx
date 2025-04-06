interface ISectionHeadingProps {
  heading: string;
  description: string;
}

function SectionHeading({ description, heading }: ISectionHeadingProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{heading}</h1>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
}

export default SectionHeading;
