import { Card, CardContent } from "@/components/ui/card";
import { UserCheckIcon, UsersIcon } from "lucide-react";

type TenantStatsCardProps = {
  totalTenants: number;
  activeTenants: number;
};

const TenantStatsCard = ({
  totalTenants,
  activeTenants,
}: TenantStatsCardProps) => {
  const tenantaStatsCardData = [
    {
      title: "Total Penyewa",
      icon: UsersIcon,
      count: totalTenants,
      color: "bg-blue-200 text-blue-600",
    },
    {
      title: "Penyewa Aktif",
      icon: UserCheckIcon,
      count: activeTenants,
      color: "bg-green-200 text-green-600",
    },
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tenantaStatsCardData.map((data, i) => {
        return (
          <Card key={i}>
            <CardContent className="flex justify-between items-center">
              <div>
                <h2 className="text-muted-foreground text-sm md:text-base font-medium">
                  {data.title}
                </h2>
                <h2 className="text-3xl font-bold">{data.count}</h2>
              </div>
              <data.icon className={`${data.color} size-12 rounded p-2`} />
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
};

export default TenantStatsCard;
