import { z } from "zod";

const idSchema = z.object({
  id: z.string().uuid(),
});

export const newReservationSchema = z.object({
  customerName: z.string(),
  tableNumber: z.number().int(),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  time: z.string().refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
    message: "Invalid time",
  }),
});

export const fullReservationsSchema = idSchema.merge(newReservationSchema);


export type NewReservation = z.infer<typeof newReservationSchema>;
export type Reservation = z.infer<typeof fullReservationsSchema>;
