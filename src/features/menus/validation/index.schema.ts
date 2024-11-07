import { z } from "zod";

export const idSchema = z.object({
  id: z.string().uuid(),
});

const menuNameSchema = z.enum(["Breakfast Menu", "Lunch Menu", "Dinner Menu"]);

export const newMenuSchema = z.object({
  name: menuNameSchema,
  dishes: z.array(z.string()),
});

export const fullMenuSchema = idSchema.merge(newMenuSchema);

export const menuUpdatesSchema = z.object({
  name: menuNameSchema.optional(),
  dishes: z.array(z.string()).optional(),
});

export type NewMenu = z.infer<typeof newMenuSchema>;
export type Menu = z.infer<typeof fullMenuSchema>;
export type MenuUpdates = z.infer<typeof menuUpdatesSchema>;
