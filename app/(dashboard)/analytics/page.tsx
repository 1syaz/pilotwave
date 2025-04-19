import PageWrapper from "../_components/PageWrapper";
import StatOverview from "../_components/StatOverview";
import AnalyticsHeader from "./_components/AnalyticsHeader";

function page() {
  const stats = [
    {
      heading: "Total Followers",
      value: "33,599",
      rate: "+12.3%",
    },
    {
      heading: "Post Engagement",
      value: "8,654",
      rate: "+18.7%",
    },
    {
      heading: "New Followers",
      value: "1,123",
      rate: "+7.2%",
    },
  ];
  return (
    <PageWrapper>
      <AnalyticsHeader />
      <StatOverview stats={stats} />
    </PageWrapper>
  );
}

export default page;
