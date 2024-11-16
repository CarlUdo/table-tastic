import type { Menu } from "./validation";

export const createRepository = (menusDb: Menu[]) => {
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
      const updatedMenusDb = menusDb.filter((dbMenu) => dbMenu.id !== id);
      menusDb.length = 0;
      menusDb.push(...updatedMenusDb);
    },
  };
};

export type Repository = ReturnType<typeof createRepository>;
