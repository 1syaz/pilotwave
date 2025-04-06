import DashboardStatCard from "../dashboard/_components/DashboardStatCard";

interface IStatOverviewProps {
  stats: {
    heading: string;
    value: string;
    rate: string;
  }[];
}

function StatOverview({ stats }: IStatOverviewProps) {
  return (
    <section className="grid grid-cols-3  md:gap-4 gap-2">
      {stats.map((stat, index) => (
        <DashboardStatCard {...stat} key={index} />
      ))}
    </section>
  );
}

export default StatOverview;
