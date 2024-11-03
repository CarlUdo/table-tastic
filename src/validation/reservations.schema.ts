import { z } from "zod";
import { isValidDishForTime } from "./menu-validation";

export const reservationSchema = z
  .object({
    id: z.string(),
    customerName: z.string(),
    tableNumber: z
      .number()
      .int()
      .min(1, { message: "Table number must be between 1 and 30" })
      .max(30, { message: "Table number must be between 1 and 30" }),
    date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
    time: z
      .string()
      .refine((val) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
        message: "Invalid time",
      }),
    dishes: z.array(z.string()),
  })
  .refine(
    async (data) => {
      const { time, dishes } = data;
      return await isValidDishForTime(dishes, time);
    },
    { message: "One or more dishes are not available for the selected time" },
  );

export type ReservationSchema = z.infer<typeof reservationSchema>;
