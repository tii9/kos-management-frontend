import { getAllTenants } from "@/api/tenant/getAllTenants";
import Loading from "@/components/Loading";
import TenantStatsCard from "@/components/tenant/TenantStatsCard";
import TenantTable from "@/components/tenant/TenantTable";
import { useAuth } from "@/hooks/useAuth";
import type { TenantType } from "@/types/TenantsType";
import { useQuery } from "@tanstack/react-query";

const TenantSection = () => {
  const { token } = useAuth();

  const { data: tenantData = [], isLoading } = useQuery<TenantType[]>({
    queryKey: ["tenants"],
    queryFn: () => getAllTenants(token),
    refetchOnWindowFocus: false,
  });

  if (isLoading || !tenantData) return <Loading />;

  const totalTenants = tenantData.length;
  const activeTenants = tenantData.filter((t) => t.is_active).length;

  return (
    <div className="grid gap-6">
      <TenantStatsCard
        totalTenants={totalTenants}
        activeTenants={activeTenants}
      />
      <TenantTable data={tenantData} />
    </div>
  );
};

export default TenantSection;
