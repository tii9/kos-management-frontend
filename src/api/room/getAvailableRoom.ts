import type { RoomType } from "@/types/RoomType";

export const getAvailableRoom = async (token: string) => {
  const res = await fetch("http://localhost:3000/api/room/available_room", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch rooms");
  }

  const json = await res.json();
  const data: RoomType[] = json.data;
  // console.log(json.data);

  return data ?? [];
};
