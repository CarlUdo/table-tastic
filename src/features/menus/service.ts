import {
  DishesUpdates,
  dishesUpdatesSchema,
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
      if (!menu) throw new NotFoundError("Menu not found.");
      return menu;
    },

    

    addMenu: async (rawData: NewMenu) => {
      const parsedMenu = newMenuSchema.parse(rawData);
      const exists = (await db.getAll()).some((dbMenu) => dbMenu.name === parsedMenu.name);
      if (exists) throw new DuplicateKeyError("Menu name already exists.");
      db.create({ id: v4(), ...parsedMenu });
    },

    updateMenu: async (rawData: DishesUpdates, id: string) => {
      const parsedUpdates = dishesUpdatesSchema.parse(rawData);      
      const menu = await db.getById(id);
      if (!menu) throw new NotFoundError("Menu not found.");
      const newDishes = [...menu.dishes, ...(parsedUpdates.dishes ?? [])];
      return await db.update({...menu, dishes: newDishes}, id);
    },

    removeMenu: async (id: string) => {
      const index = (await db.getAll()).findIndex((menu) => menu.id === id);
      if (index === -1) throw new NotFoundError("Menu not found.");
      db.remove(id);
    },
  };
};

export type Service = ReturnType<typeof createService>;
