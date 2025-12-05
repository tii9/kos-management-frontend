import type { RoomType } from "@/types/RoomType";

export type TenantType = {
  id: string;
  name: string;
  phone: string;
  start_date?: Date;
  next_payment_date?: Date;
  payment_status?: "pending" | "paid" | "overdue";
  is_active: boolean;
  room?: RoomType;
  roomId?: string;
  created_at?: Date;
};
