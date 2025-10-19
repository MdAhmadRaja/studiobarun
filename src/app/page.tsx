import { DashboardLayout } from "@/components/dashboard-layout";
import { StatCard } from "@/components/stat-card";
import { EventsChart } from "@/components/events-chart";
import { DeliveryStatusChart } from "@/components/delivery-status-chart";
import { statCards } from "@/lib/data";

export default function Home() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="font-headline text-2xl font-bold">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <EventsChart />
          <DeliveryStatusChart />
        </div>
      </div>
    </DashboardLayout>
  );
}
