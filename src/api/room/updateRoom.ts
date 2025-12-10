import type { UpdateRoomPayload } from "@/types/UpdateRoomPayload";

export const updateRoom = async (payload: UpdateRoomPayload) => {
  const is_available = payload.is_available == "Tersedia" ? true : false;
  console.log(payload, is_available);

  const res = await fetch(`http://localhost:3000/api/room/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.token}`,
    },
    body: JSON.stringify({
      room_number: payload.room_number,
      price_per_month: payload.price_per_month,
      is_available,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};
