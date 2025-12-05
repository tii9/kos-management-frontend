import { getAllRoom } from "@/api/room/getAllRoom";
import CreateRoomForm from "@/components/room/CreateRoomForm";
import { RoomTable } from "@/components/room/RoomTable";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { cardStats } from "@/lib/cardStats";
import type { RoomType } from "@/types/RoomType";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircleIcon, SearchIcon } from "lucide-react";

const RoomSection = () => {
  const { token } = useAuth();

  const {
    data: roomData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => getAllRoom(token),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <LoaderCircleIcon className="animate-spin size-8 text-primary" />
      </div>
    );
  }

  const counts: Record<"Total Kamar" | "Kamar Tersedia", number> = {
    "Total Kamar": roomData.length,
    "Kamar Tersedia": roomData.filter((d: RoomType) => d.is_available).length,
  };

  return (
    <div className="grid gap-6">
      <section className="flex justify-between">
        <div className="relative w-full max-w-sm">
          <SearchIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search rooms..."
            className="pl-9 w-full"
          />
        </div>
        <CreateRoomForm />
      </section>
      <section className="grid grid-cols-4 gap-4">
        {cardStats.map((data, i) => {
          return (
            <Card key={i}>
              <CardContent className="flex justify-between items-center">
                <div>
                  <h2 className="text-muted-foreground font-medium">
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
        <RoomTable data={roomData} isLoading={isLoading} isError={isError} />
      </section>
    </div>
  );
};

export default RoomSection;
