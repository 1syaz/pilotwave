import SectionHeading from "../../_components/SectionHeading";

function AnalyticsHeader() {
  return (
    <section className="flex lg:flex-row flex-col lg:items-center items-start justify-between gap-5">
      <SectionHeading
        description="Track your social media performance metrics."
        heading="Analytics"
      />
    </section>
  );
}

export default AnalyticsHeader;
