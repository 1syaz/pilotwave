import PageWrapper from "../_components/PageWrapper";
import DashboardHeader from "./_components/DashboardHeader";
import RecentComments from "./_components/RecentComments";
import UpcomingPosts from "./_components/UpcomingPosts";

function page() {
  return (
    <PageWrapper>
      <DashboardHeader />

      <section className="grid lg:grid-cols-3 grid-cols-1  gap-5">
        <RecentComments />
        <UpcomingPosts />
      </section>
    </PageWrapper>
  );
}

export default page;
