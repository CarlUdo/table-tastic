/*
  To mirror real-life scenarios where database operations are asynchronous I utilize promises and async/await syntax.
*/

import { menusDb } from "../../db/menus/menus-db";
import type { Menu } from "../../db/menus/menus-db";

export const getAll = async (): Promise<Menu[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(menusDb), 100);
  });
};

export const getById = async (id: string): Promise<Menu> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const menu = menusDb.find((menu) => menu.id === id);

      if (!menu) {
        reject(new Error("Menu not found"));
        return;
      }

      resolve(menu);
    }, 100);
  });
};
