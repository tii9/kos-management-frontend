import type { InsertNewRoomPayload } from "@/types/InsertNewRoomPayload";

export const insertNewRoom = async (payload: InsertNewRoomPayload) => {
  const res = await fetch("http://localhost:3000/api/room", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.token}`,
    },
    body: JSON.stringify({
      room_number: payload.room_number,
      price_per_month: payload.price_per_month,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
};
