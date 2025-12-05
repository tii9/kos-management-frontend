import type { TenantType } from "@/types/TenantsType";

export type RoomType = {
  id: string,
  room_number: string,
  is_available: boolean,
  price_per_month: number,
  tenants: TenantType,
  created_at?: Date,
  updated_at?: Date
};