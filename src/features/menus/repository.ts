import type { Menu, MenuUpdates } from "./validation";

export const createRepository = () => {
  const menusDb: Menu[] = [
    {
      id: "9de3faf7-36f3-4449-b4b5-7c3393f00e10",
      name: "Breakfast Menu",
      dishes: ["Pancakes", "Omelette"],
    },
    {
      id: "fd9c2bf1-8540-4ed9-9be7-155877262259",
      name: "Lunch Menu",
      dishes: ["Burger", "Salad"],
    },
    {
      id: "42995559-2641-4d33-85e9-9043373fc6bf",
      name: "Dinner Menu",
      dishes: ["Steak", "Pasta"],
    },
  ];

  return {
    getAll: async () => menusDb,

    getById: async (id: string) => menusDb.find((dbMenu) => dbMenu.id === id),

    create: async (menu: Menu) => menusDb.push(menu),

    update: async (index: number, update: MenuUpdates) =>
      (menusDb[index] = { ...menusDb[index], ...update }),

    remove: async (id: string) => menusDb.filter((menu) => menu.id !== id),
  };
};

export type Repository = ReturnType<typeof createRepository>;

// return {
//   getAll: async () => menusDb,
//   getById: async (id: string) => {
//     const menu = menusDb.find((dbMenu) => dbMenu.id === id);
//     if (!menu) throw new Error(MENU_NOT_FOUND);
//     return menu;
//   },
//   create: async (menu: Menu) => {
//     const exists = menusDb.some((dbMenu) => dbMenu.name === menu.name);
//     if (exists) throw new Error(MENU_EXISTS);
//     menusDb.push(menu);
//     return menu; // Kanske inte bör returnera något!!
//   },
//   update: async (menu: Menu) => {
//     const menuToUpdate = menusDb.find((dbMenu) => dbMenu.id === menu.id);

//     if (!menuToUpdate) return new Error(MENU_NOT_FOUND);

//     return menu; // Uppdatera den här inne med det som ska uppdateras anting PUT eller PATCH
//   },
//   remove: async (id: string) => {
//     const menu = menusDb.find((dbMenu) => dbMenu.id === id);
//     if (!menu) throw (new Error(MENU_NOT_FOUND));

//     const updatedMenusDb = menusDb.filter((dbMenu) => dbMenu.id !== id);

//     menusDb.length = 0;
//     menusDb.push(...updatedMenusDb);

//     return menu; // Inget ska returneras!!
//   },
// };
