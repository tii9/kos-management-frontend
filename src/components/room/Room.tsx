import { getAllRoom } from "@/api/room/getAllRoom";
import Loading from "@/components/Loading";
import { RoomTable } from "@/components/room/RoomTable";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { roomCardStats } from "@/lib/roomCardStats";
import type { RoomType } from "@/types/RoomType";
import { useQuery } from "@tanstack/react-query";

const RoomSection = () => {
  const { token } = useAuth();

  const { data: roomData = [], isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => getAllRoom(token),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;

  const counts: Record<"Total Kamar" | "Kamar Tersedia", number> = {
    "Total Kamar": roomData.length,
    "Kamar Tersedia": roomData.filter((d: RoomType) => d.is_available).length,
  };

  return (
    <div className="grid gap-6">
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {roomCardStats.map((data, i) => {
          return (
            <Card key={i}>
              <CardContent className="flex justify-between items-center">
                <div>
                  <h2 className="text-muted-foreground text-sm md:text-base font-medium">
                    {data.title}
                  </h2>
                  <h2 className="text-3xl font-bold">
                    {counts[data.title] ?? 0}
                  </h2>
                </div>
                <data.icon className={`${data.color} size-12 rounded p-2`} />
              </CardContent>
            </Card>
          );
        })}
      </section>
      <section>
        <RoomTable data={roomData} />
      </section>
    </div>
  );
};

export default RoomSection;
