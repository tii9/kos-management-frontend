import z from "zod";

export const UpdateRoomSchema = z.object({
  id: z.string(),
  room_number: z.string().min(1, "nomor kamar wajib diisi"),
  price_per_month: z.number().min(1, "harga per bulan tidak boleh kosong"),
  is_available: z.string(),
  token: z.string(),
});

export type UpdateRoomPayload = z.infer<typeof UpdateRoomSchema>;
