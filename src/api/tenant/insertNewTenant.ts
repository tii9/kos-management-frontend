import type { NewTenantPayload } from "@/types/NewTenantPayload";

export const insertNewTenant = async (payload: NewTenantPayload) => {
  const res = await fetch("http://localhost:3000/api/tenant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.token}`,
    },
    body: JSON.stringify({
      name: payload.name,
      phone: payload.phone,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
};
