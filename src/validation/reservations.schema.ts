import { z } from "zod";

export const reservationSchema = z.object({
  id: z.string(),
  customerName: z.string(),
  tableNumber: z
    .number()
    .int()
    .min(1)
    .max(30, "Table number must be between 1 and 30"),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  time: z
    .string()
    .refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
      message: "Invalid time",
    }),
});

export type ReservationSchema = z.infer<typeof reservationSchema>;
