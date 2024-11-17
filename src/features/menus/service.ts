import {
  DishesUpdates,
  dishesUpdatesSchema,
  newMenuSchema,
  type NewMenu,
} from ".";
import { Repository } from ".";
import { v4 } from "uuid";
import {
  DuplicateKeyError,
  NotFoundError,
} from "../../libs";
import { MENU_EXISTS, MENU_NOT_FOUND } from ".";

export const createService = (db: Repository) => {
  return {
    getAllMenus: async () => db.getAll(),

    getMenu: async (id: string) => {
      const menu = await db.getById(id);
      if (!menu) throw new NotFoundError(MENU_NOT_FOUND);
      return menu;
    },

    addMenu: async (rawData: NewMenu) => {
      const menu = newMenuSchema.parse(rawData);
      const exists = (await db.getAll()).some(
        (dbMenu) => dbMenu.name === menu.name,
      );
      if (exists) throw new DuplicateKeyError(MENU_EXISTS);
      return db.create({ id: v4(), ...menu });
    },

    updateMenu: async (rawData: DishesUpdates, id: string) => {
      const { dishes } = dishesUpdatesSchema.parse(rawData);
      const menus = await db.getAll();
      const index = menus.findIndex((menu) => menu.id === id);
      if (index === -1) throw new NotFoundError(MENU_NOT_FOUND);

      const dishesSet = new Set([...menus[index].dishes, ...dishes]);

      return await db.update([...dishesSet], index);
    },

    removeMenu: async (id: string) => {
      const index = (await db.getAll()).findIndex((menu) => menu.id === id);
      if (index === -1) throw new NotFoundError(MENU_NOT_FOUND);
      return await db.remove(id);
    },
  };
};

export type Service = ReturnType<typeof createService>;
