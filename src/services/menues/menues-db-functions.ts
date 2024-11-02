/*
  To mirror real-life scenarios where database operations are asynchronous I utilize promises and async/await syntax.
*/

import { menuesDb } from "../../db/menues/menues-db";
import type { Menu } from "../../db/menues/menues-db";

export const getAll = async (): Promise<Menu[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(menuesDb), 100);
  });
};

export const getById = async (id: string): Promise<Menu> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const menu = menuesDb.find((menu) => menu.id === id);

      if (!menu) {
        reject(new Error("Menu not found"));
        return;
      }

      resolve(menu);
    }, 100);
  });
};
