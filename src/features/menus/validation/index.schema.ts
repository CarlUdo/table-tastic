import { z } from "zod";

const idSchema = z.object({
  id: z.string().uuid(),
});

const menuNameSchema = z.enum(["Breakfast Menu", "Lunch Menu", "Dinner Menu"]);

export const newMenuSchema = z.object({
  name: menuNameSchema,
  dishes: z.array(z.string()),
});

export const fullMenuSchema = idSchema.merge(newMenuSchema);

export const dishesUpdatesSchema = z.object({
  dishes: z.array(z.string()),
});

export type NewMenu = z.infer<typeof newMenuSchema>;
export type Menu = z.infer<typeof fullMenuSchema>;
export type DishesUpdates = z.infer<typeof dishesUpdatesSchema>;
