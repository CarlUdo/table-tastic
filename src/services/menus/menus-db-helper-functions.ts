import { createMenusDb } from ".";

export const getMenuId = async (time: string) => {
  const [hour] = time.split(":").map(Number);
  const menus = await createMenusDb.getAll();

  if (hour >= 0 && hour < 10)
    return menus.find((menu) => menu.name === "Breakfast Menu")?.id;
  if (hour >= 10 && hour < 16)
    return menus.find((menu) => menu.name === "Lunch Menu")?.id;

  return menus.find((menu) => menu.name === "Dinner Menu")?.id;
};
