import type { Menu } from "./validation";

export const createMenusRepository = (menusDb: Menu[]) => {
  return {
    getAll: async () => menusDb,

    getById: async (id: string) => menusDb.find((dbMenu) => dbMenu.id === id),

    create: async (menu: Menu) => {
      menusDb.push(menu);
      return menu;
    },

    update: async (dishes: string[], index: number) => {
      menusDb[index] = { ...menusDb[index], dishes };
      return menusDb[index];
    },

    remove: async (id: string) => {
      const removedMenu = menusDb.find((dbMenu) => dbMenu.id === id);
      const updatedMenusDb = menusDb.filter((dbMenu) => dbMenu.id !== id);
      menusDb.length = 0;
      menusDb.push(...updatedMenusDb);
      return removedMenu;
    },
  };
};

export type Repository = ReturnType<typeof createMenusRepository>;
