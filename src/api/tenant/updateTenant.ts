import type { UpdateTenantPayload } from "@/types/UpdateTenantPayload";

export const updateTenant = async (payload: UpdateTenantPayload) => {
  const is_active = payload.is_active == "Aktif" ? true : false;

  const res = await fetch(`http://localhost:3000/api/tenant/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.token}`,
    },
    body: JSON.stringify({
      name: payload.name,
      phone: payload.phone,
      is_active,
      start_date: is_active
        ? payload.roomId
          ? new Date().toISOString()
          : null
        : null,
      next_payment_date: is_active
        ? payload.roomId
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          : null
        : null,
      payment_status: is_active ? "pending" : null,
      roomId: is_active ? payload.roomId ?? payload.roomId : null,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  // console.log(data);

  return data;
};
