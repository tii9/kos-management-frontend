export type TenantType = {
  id: string,
  name: string,
  phone: string,
  start_date?: Date,
  next_payment_date?: Date,
  payment_status: "pending" | "paid" | "overdue",
  is_active: boolean,
  created_at?: Date
}