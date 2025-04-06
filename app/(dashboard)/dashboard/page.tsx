import PageWrapper from "../_components/PageWrapper";
import StatOverview from "../_components/StatOverview";
import DashboardHeader from "./_components/DashboardHeader";
import RecentComments from "./_components/RecentComments";
import UpcomingPosts from "./_components/UpcomingPosts";

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
      <DashboardHeader />
      <StatOverview stats={stats} />
      <section className="grid lg:grid-cols-3 grid-cols-1  gap-5">
        <RecentComments />
        <div className="">
          <UpcomingPosts />
        </div>
      </section>
    </PageWrapper>
  );
}

export default page;
