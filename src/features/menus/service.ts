import type { Menu } from "./validation";
import { Repository } from ".";

export const createService = (db: Repository) => {
  return {
    getAllMenus: async () => db,
    getMenu: async (id: string) => {
      const menu = (await db.getAll()).find((menu) => menu.id === id);
      if (!menu) throw new Error("Menu not found");
      return menu;
    },
    addMenu: async (menu: Menu) => {
      // Felhantering!!
      db.create(menu);
    },
    updateMenu: async (update: any, id: string) => {
      const menu = (await db.getAll()).find((menu) => menu.id === id);
      if (!menu) throw new Error("Menu not found");
      return { ...menu, ...update };
    },
    removeMenu: async (id: string) => {
      const menus = await db.getAll();
      const menu = menus.find((dbMenu) => dbMenu.id === id);
      if (!menu) return false;
      return menus.filter((dbMenu) => dbMenu.id !== id);
    },
  };
};

export type MenusService = ReturnType<typeof createService>;
