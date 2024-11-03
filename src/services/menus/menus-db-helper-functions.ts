import { getAll } from "./menus-db-functions";

export const getMenuId = async (time: string) => {
  const [hour] = time.split(":").map(Number);
  const menus = await getAll();

  if (hour >= 0 && hour < 10)
    return menus.find((menu) => menu.name === "Breakfast Menu")?.id;
  if (hour >= 10 && hour < 16)
    return menus.find((menu) => menu.name === "Lunch Menu")?.id;

  return menus.find((menu) => menu.name === "Dinner Menu")?.id;
};

export const getMockMenuId = async (): Promise<string> => {
  return "mocked-menu-id";
};
