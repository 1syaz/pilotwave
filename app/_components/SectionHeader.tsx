interface ISectionHeaderProps {
  title: string;
  heading: string;
  description: string;
}

function SectionHeader({ title, heading, description }: ISectionHeaderProps) {
  return (
    <section className="flex  lg:items-center items-start justify-center flex-col gap-3 lg:text-center text-start">
      <h3 className="text-primary font-semibold uppercase text-md">{title}</h3>
      <h2 className="sm:text-4xl text-3xl font-bold">{heading}</h2>
      <p className="text-foreground/60 sm:text-lg text-md md:w-[600px]">
        {description}
      </p>
    </section>
  );
}

export default SectionHeader;
