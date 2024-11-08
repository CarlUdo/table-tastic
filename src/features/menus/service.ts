import {
  MenuUpdates,
  menuUpdatesSchema,
  newMenuSchema,
  type NewMenu,
} from "./validation";
import { Repository } from ".";
import { v4 } from "uuid";
import { DuplicateKeyError, NotFoundError } from "../../errors";

export const createService = (db: Repository) => {
  return {
    getAllMenus: async () => db.getAll(),

    getMenu: async (id: string) => {
      const menu = await db.getById(id);
      if (!menu) throw new NotFoundError("Menu not found");
      return menu;
    },

    addMenu: async (rawData: NewMenu) => {
      const parsedMenu = newMenuSchema.parse(rawData);
      const exists = (await db.getAll()).some((dbMenu) => dbMenu.name === parsedMenu.name);
      if (exists) throw new DuplicateKeyError("Menu name already exists.");
      db.create({ id: v4(), ...parsedMenu });
    },

    updateMenu: async (rawData: MenuUpdates, id: string) => {
      //const parsedUpdates = menuUpdatesSchema.parse(rawData);
      console.log("Parsed updates: ", rawData);
      const index = (await db.getAll()).findIndex((menu) => menu.id === id);
      if (index === -1) throw new Error("Menu not found");
      return await db.update(rawData, index);
    },

    removeMenu: async (id: string) => {
      const index = (await db.getAll()).findIndex((menu) => menu.id === id);
      if (index === -1) throw new Error("Menu not found");
      db.remove(id);
    },
  };
};

export type Service = ReturnType<typeof createService>;
