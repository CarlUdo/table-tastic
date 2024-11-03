import { z } from "zod";

export const idSchema = z.string().uuid();

const menuNameSchema = z.enum(["Breakfast Menu", "Lunch Menu", "Dinner Menu"]);

export const menuSchema = z.object({
  name: menuNameSchema,
  dishes: z.array(z.string()),
});

export type MenuSchema = z.infer<typeof menuSchema>;
