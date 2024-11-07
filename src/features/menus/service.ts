import {
  MenuUpdates,
  menuUpdatesSchema,
  newMenuSchema,
  type NewMenu,
} from "./validation";
import { Repository } from ".";
import { v4 } from "uuid";

export const createService = (db: Repository) => {
  return {
    getAllMenus: async () => db,

    getMenu: async (id: string) => {
      const menu = await db.getById(id);
      if (!menu) throw new Error("Menu not found");
      return menu;
    },

    addMenu: async (rawData: NewMenu) => {
      const parsedMenu = newMenuSchema.parse(rawData);
      db.create({ id: v4(), ...parsedMenu });
    },

    updateMenu: async (rawData: MenuUpdates, id: string) => {
      const parsedUpdates = menuUpdatesSchema.parse(rawData);
      const index = (await db.getAll()).findIndex((menu) => menu.id === id);
      if (index === -1) throw new Error("Menu not found");
      db.update(parsedUpdates, index);
    },

    removeMenu: async (id: string) => {
      const index = (await db.getAll()).findIndex((menu) => menu.id === id);
      if (index === -1) throw new Error("Menu not found");
      db.remove(id);
    },
  };
};

export type Service = ReturnType<typeof createService>;
