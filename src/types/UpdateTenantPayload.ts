import { indonesianPhone } from "@/lib/indonesiaPhoneValidator";
import z from "zod";

export const UpdateTenantSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "nama penyewa wajib diisi"),
  phone: indonesianPhone,
  is_active: z.string(),
  token: z.string(),
  // roomId: z.union([z.string(), z.null()]).transform((v) => {
  //   if (v === "" || v === undefined) return null;
  //   return v;
  // }),
  roomId: z.string().nullable(),
});

export type UpdateTenantPayload = z.infer<typeof UpdateTenantSchema>;
