import { z } from "zod";

/**
 * Validasi dan normalisasi nomor HP Indonesia -> E.164 (+62...)
 * Aturan:
 * - Terima: 0812..., 62812..., +62812..., dengan atau tanpa spasi/dash.
 * - Hasil akan berbentuk +62XXXXXXXXXXX
 */

export const indonesianPhone = z
  .string()
  .transform((raw) => raw.replace(/[\s-().]/g, "")) // hapus spasi/dash/()
  .transform((s) => {
    // kalau mulai dengan +, biarkan; kalau mulai dengan 0 -> ubah ke +62; kalau mulai dgn 62 -> tambahkan +
    if (s.startsWith("+")) return s;
    if (s.startsWith("0")) return "+62" + s.slice(1);
    if (s.startsWith("62")) return "+" + s;
    return s; // biarkan (akan gagal validasi kemudian)
  })
  .refine((s) => /^\+62[1-9][0-9]{6,12}$/.test(s), {
    message:
      "Nomor harus berupa nomor HP Indonesia yang valid (contoh: 0812..., +62812...).",
  });
